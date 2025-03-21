
import React from 'react';
import { WeatherHistoryRecord } from '../types/weatherHistory';
import { format } from 'date-fns';
import { Pencil, Trash, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { mapConditionCode } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface WeatherHistoryTableProps {
  records: WeatherHistoryRecord[];
  onView: (record: WeatherHistoryRecord) => void;
  onEdit: (record: WeatherHistoryRecord) => void;
  onDelete: (id: string) => void;
}

export const WeatherHistoryTable: React.FC<WeatherHistoryTableProps> = ({
  records,
  onView,
  onEdit,
  onDelete
}) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No search history found.</p>
        <p className="text-sm text-muted-foreground mt-2">Try searching for a location to see weather data here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg glass-panel">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="px-4 py-3 text-left text-sm font-semibold text-white">Location</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-white">Date Range</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-white">Weather</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-white">Searched On</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const weatherCondition = mapConditionCode(record.weatherData.current.condition.code);
            const searchDate = new Date(record.searchDate);
            const formattedSearchDate = format(searchDate, 'MMM d, yyyy • h:mm a');
            
            return (
              <tr key={record.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-white">{record.location}</td>
                <td className="px-4 py-3 text-white/80">
                  {format(new Date(record.startDate), 'MMM d, yyyy')} - {format(new Date(record.endDate), 'MMM d, yyyy')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <WeatherIcon condition={weatherCondition} size={24} animate={false} />
                    <span className="ml-2 text-white">{Math.round(record.weatherData.current.temp_c)}°C</span>
                    <span className="ml-2 text-white/70">{record.weatherData.current.condition.text}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/80">{formattedSearchDate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onView(record)}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onEdit(record)}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onDelete(record.id)}
                      className="text-white/70 hover:text-red-400 hover:bg-white/10"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
