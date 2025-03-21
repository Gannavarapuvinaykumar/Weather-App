
import React from 'react';
import { WeatherData, WeatherCondition, mapConditionCode } from '../types/weather';
import { format } from 'date-fns';
import { WeatherIcon } from './WeatherIcon';
import { ForecastDay } from './ForecastDay';
import { 
  Wind, 
  Droplets, 
  Thermometer,
  Sunrise,
  Sunset,
  CalendarClock,
  Eye
} from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
  isLoading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return (
      <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl p-8 shadow-xl animate-pulse">
        <div className="h-10 bg-white/20 rounded-lg w-1/3 mx-auto mb-6"></div>
        <div className="h-24 bg-white/20 rounded-lg w-1/2 mx-auto mb-8"></div>
        <div className="h-16 bg-white/20 rounded-lg w-2/3 mx-auto mb-10"></div>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-white/20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const weatherCondition: WeatherCondition = mapConditionCode(data.current.condition.code);
  const localTime = new Date(data.location.localtime);
  const formattedTime = format(localTime, 'EEEE, MMMM d • h:mm a');
  
  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl p-8 shadow-xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-1 text-shadow">{data.location.name}</h1>
        <h2 className="text-lg sm:text-xl text-white/80 font-medium">{data.location.region}, {data.location.country}</h2>
        <div className="flex items-center justify-center mt-2">
          <CalendarClock size={18} className="text-white/70 mr-2" />
          <p className="text-sm text-white/70">{formattedTime}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-6">
        <div className="flex items-center justify-center">
          <WeatherIcon 
            condition={weatherCondition} 
            size={80} 
            className="text-white mr-4" 
          />
          <div className="text-center sm:text-left">
            <p className="text-6xl font-bold text-white text-shadow">{Math.round(data.current.temp_c)}°</p>
            <p className="text-white/80 mt-1 font-medium">{data.current.condition.text}</p>
          </div>
        </div>

        <div className="border-t border-white/30 sm:border-t-0 sm:border-l pt-6 sm:pt-0 sm:pl-8 mt-2 sm:mt-0">
          <div className="grid grid-cols-2 gap-4 text-white/90">
            <div className="flex items-center">
              <Thermometer size={18} className="mr-2 text-white/70" />
              <div>
                <p className="text-xs uppercase text-white/70">Feels like</p>
                <p className="font-medium">{Math.round(data.current.feelslike_c)}°C</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Wind size={18} className="mr-2 text-white/70" />
              <div>
                <p className="text-xs uppercase text-white/70">Wind</p>
                <p className="font-medium">{data.current.wind_kph} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Droplets size={18} className="mr-2 text-white/70" />
              <div>
                <p className="text-xs uppercase text-white/70">Humidity</p>
                <p className="font-medium">{data.current.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Eye size={18} className="mr-2 text-white/70" />
              <div>
                <p className="text-xs uppercase text-white/70">Visibility</p>
                <p className="font-medium">{data.current.vis_km} km</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {data.forecast && (
        <div className="border-t border-white/30 pt-6">
          <h3 className="text-lg font-bold text-white mb-4 text-shadow">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {data.forecast.forecastday.map((day, index) => (
              <ForecastDay 
                key={day.date} 
                forecast={day} 
                isToday={index === 0}
              />
            ))}
          </div>
        </div>
      )}

      {data.forecast && data.forecast.forecastday.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/30 text-sm text-white/70">
          <div className="flex items-center">
            <Sunrise size={16} className="mr-1" />
            <span>Sunrise: {data.forecast.forecastday[0].astro.sunrise}</span>
          </div>
          <div className="flex items-center">
            <Sunset size={16} className="mr-1" />
            <span>Sunset: {data.forecast.forecastday[0].astro.sunset}</span>
          </div>
        </div>
      )}
    </div>
  );
};
