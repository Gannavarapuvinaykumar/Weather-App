
import React, { useState } from 'react';
import { WeatherHistoryRecord } from '../types/weatherHistory';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { Calendar as CalendarIcon, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { updateWeatherRecord } from '../services/dbService';
import { WeatherCard } from './WeatherCard';
import { validateLocation } from '../services/weatherService';
import { toast } from 'sonner';
import { getLocationVideos, getGoogleMapsUrl, getStaticMapUrl } from '../services/externalApiService';

interface WeatherRecordDialogProps {
  record: WeatherHistoryRecord;
  mode: 'view' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const WeatherRecordDialog: React.FC<WeatherRecordDialogProps> = ({
  record,
  mode,
  open,
  onOpenChange,
  onUpdate
}) => {
  const [editMode, setEditMode] = useState(mode === 'edit');
  const [location, setLocation] = useState(record.location);
  const [startDate, setStartDate] = useState<Date>(new Date(record.startDate));
  const [endDate, setEndDate] = useState<Date>(new Date(record.endDate));
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [showVideos, setShowVideos] = useState(false);
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, 'PPP');
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Reset form to original values when canceling edit
      setLocation(record.location);
      setStartDate(new Date(record.startDate));
      setEndDate(new Date(record.endDate));
    }
  };
  
  // Handle save changes
  const handleSave = async () => {
    setIsLoading(true);
    
    // Validate dates
    if (startDate > endDate) {
      toast.error('Start date cannot be after end date');
      setIsLoading(false);
      return;
    }
    
    // Validate location
    const isValidLocation = await validateLocation(location);
    if (!isValidLocation) {
      toast.error('Please enter a valid location');
      setIsLoading(false);
      return;
    }
    
    // Update record
    const updatedRecord = updateWeatherRecord(record.id, {
      location,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
    
    if (updatedRecord) {
      toast.success('Record updated successfully');
      onUpdate();
    } else {
      toast.error('Failed to update record');
    }
    
    setIsLoading(false);
    setEditMode(false);
  };
  
  // Load videos
  const loadVideos = async () => {
    setShowVideos(true);
    if (videos.length === 0) {
      const fetchedVideos = await getLocationVideos(record.location);
      setVideos(fetchedVideos);
    }
  };
  
  // Google Maps URL
  const mapsUrl = getGoogleMapsUrl(record.location);
  const staticMapUrl = getStaticMapUrl(record.location);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{editMode ? 'Edit Weather Record' : 'Weather Record Details'}</span>
            {!editMode && mode !== 'edit' && (
              <Button variant="outline" size="sm" onClick={toggleEditMode} className="gap-1">
                <Pencil size={14} />
                Edit
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {editMode ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDate(startDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDate(endDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="text-base">{record.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date Range</h3>
                <p className="text-base">
                  {format(new Date(record.startDate), 'MMM d, yyyy')} to {format(new Date(record.endDate), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Weather Data</h3>
              <div className="scale-[0.85] origin-top-left">
                <WeatherCard data={record.weatherData} isLoading={false} />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Map</h3>
              <div className="rounded-lg overflow-hidden border">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <img src={staticMapUrl} alt={`Map of ${record.location}`} className="w-full h-[200px] object-cover" />
                </a>
                <div className="p-2 text-center text-sm text-muted-foreground bg-muted">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
            
            {!showVideos ? (
              <div className="text-center py-2">
                <Button onClick={loadVideos}>Show Related Videos</Button>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Related Videos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <a 
                      key={video.id} 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="rounded-lg overflow-hidden border bg-card hover:bg-accent transition-colors"
                    >
                      <img src={video.thumbnail} alt={video.title} className="w-full h-[120px] object-cover" />
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{video.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <DialogFooter>
          {editMode ? (
            <>
              <Button variant="outline" onClick={toggleEditMode}>Cancel</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
