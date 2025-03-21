
import React from 'react';
import { format } from 'date-fns';
import { ForecastDay as ForecastDayType } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { mapConditionCode } from '../types/weather';

interface ForecastDayProps {
  forecast: ForecastDayType;
  isToday?: boolean;
}

export const ForecastDay: React.FC<ForecastDayProps> = ({ forecast, isToday = false }) => {
  const date = new Date(forecast.date);
  const dayName = isToday ? 'Today' : format(date, 'EEEE');
  const weatherCondition = mapConditionCode(forecast.day.condition.code);
  
  return (
    <div className="flex flex-col items-center p-2 rounded-xl transition-transform duration-300 hover:scale-105">
      <p className="text-sm font-medium mb-1 text-center">{dayName}</p>
      
      <div className="relative my-2">
        <WeatherIcon 
          condition={weatherCondition} 
          size={32} 
          animate={false}
          className="mx-auto"
        />
      </div>
      
      <div className="flex items-center justify-center gap-2 font-semibold">
        <span>{Math.round(forecast.day.maxtemp_c)}°</span>
        <span className="text-foreground/60">{Math.round(forecast.day.mintemp_c)}°</span>
      </div>
      
      <p className="text-xs text-center mt-1 text-foreground/70">
        {forecast.day.daily_chance_of_rain > 0 && (
          <span>Rain: {forecast.day.daily_chance_of_rain}%</span>
        )}
      </p>
    </div>
  );
};
