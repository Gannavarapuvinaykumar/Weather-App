
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { WeatherHistoryRecord, WeatherHistoryFilter } from '../types/weatherHistory';
import { Background } from '../components/Background';
import { WeatherHistoryTable } from '../components/WeatherHistoryTable';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { 
  getWeatherRecords, 
  deleteWeatherRecord, 
  clearAllWeatherRecords
} from '../services/dbService';
import { 
  exportToJson,
  exportToCsv,
  exportToXml,
  exportToMarkdown
} from '../services/exportService';
import { WeatherRecordDialog } from '../components/WeatherRecordDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Calendar as CalendarIcon, FileJson, FileSpreadsheet, FileText, FileBadge, FilterX, Trash2, Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const WeatherHistory = () => {
  const [records, setRecords] = useState<WeatherHistoryRecord[]>([]);
  const [filter, setFilter] = useState<WeatherHistoryFilter>({});
  const [selectedRecord, setSelectedRecord] = useState<WeatherHistoryRecord | null>(null);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit'>('view');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Load records on mount and when filter changes
  useEffect(() => {
    loadRecords();
  }, [filter]);
  
  // Format date for display
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'MMM dd, yyyy') : '';
  };
  
  // Load weather records from the database
  const loadRecords = () => {
    const fetchedRecords = getWeatherRecords(filter);
    setRecords(fetchedRecords);
  };
  
  // Handle viewing a record
  const handleViewRecord = (record: WeatherHistoryRecord) => {
    setSelectedRecord(record);
    setDialogMode('view');
    setIsDialogOpen(true);
  };
  
  // Handle editing a record
  const handleEditRecord = (record: WeatherHistoryRecord) => {
    setSelectedRecord(record);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };
  
  // Handle deleting a record
  const handleDeleteRecord = (id: string) => {
    const success = deleteWeatherRecord(id);
    if (success) {
      toast.success('Record deleted successfully');
      loadRecords();
    } else {
      toast.error('Failed to delete record');
    }
  };
  
  // Handle clearing all records
  const handleClearAllRecords = () => {
    clearAllWeatherRecords();
    toast.success('All records cleared');
    loadRecords();
  };
  
  // Update filters
  const updateLocationFilter = (location: string) => {
    setFilter(prev => ({ ...prev, location: location || undefined }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilter({});
    setStartDate(undefined);
    setEndDate(undefined);
  };
  
  // Update date filters when calendar dates change
  useEffect(() => {
    const newFilter: WeatherHistoryFilter = { ...filter };
    
    if (startDate) {
      newFilter.startDate = startDate.toISOString().split('T')[0];
    } else {
      delete newFilter.startDate;
    }
    
    if (endDate) {
      newFilter.endDate = endDate.toISOString().split('T')[0];
    } else {
      delete newFilter.endDate;
    }
    
    setFilter(newFilter);
  }, [startDate, endDate]);
  
  // Handle record update from dialog
  const handleRecordUpdate = () => {
    loadRecords();
    setIsDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background condition="cloudy" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-8 min-h-screen">
        <header className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Link to="/" className="text-white hover:text-white/80 mr-4">
                <ArrowLeft className="inline-block mr-1" size={18} />
                Back to Weather
              </Link>
              <h1 className="text-3xl font-bold font-display text-white text-shadow">Weather History</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 size={16} />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all weather history?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. All your saved weather searches will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAllRecords}>
                      Yes, clear all
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download size={16} />
                      Export
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="grid gap-1">
                      <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={() => exportToJson(records)}>
                        <FileJson size={16} />
                        Export as JSON
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={() => exportToCsv(records)}>
                        <FileSpreadsheet size={16} />
                        Export as CSV
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={() => exportToXml(records)}>
                        <FileBadge size={16} />
                        Export as XML
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={() => exportToMarkdown(records)}>
                        <FileText size={16} />
                        Export as Markdown
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </header>
        
        <div className="mb-6 glass-panel p-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-1 block">Location</label>
              <Input 
                placeholder="Filter by location..."
                value={filter.location || ''}
                onChange={(e) => updateLocationFilter(e.target.value)}
                className="bg-white/10 text-white border-white/20"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-white/80 mb-1 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/10 text-white border-white/20"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? formatDate(startDate) : <span className="text-muted-foreground">Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white/80 mb-1 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/10 text-white border-white/20"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? formatDate(endDate) : <span className="text-muted-foreground">Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" size="sm" onClick={resetFilters} className="gap-2">
              <FilterX size={16} />
              Reset Filters
            </Button>
          </div>
        </div>
        
        <main>
          <WeatherHistoryTable 
            records={records}
            onView={handleViewRecord}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
        </main>
      </div>
      
      {/* Dialog for viewing/editing records */}
      {selectedRecord && (
        <WeatherRecordDialog
          record={selectedRecord}
          mode={dialogMode}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onUpdate={handleRecordUpdate}
        />
      )}
    </div>
  );
};

export default WeatherHistory;
