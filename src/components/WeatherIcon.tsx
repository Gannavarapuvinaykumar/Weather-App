
import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  CloudFog,
  Cloudy
} from 'lucide-react';
import { WeatherCondition } from '../types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
  animate?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 24, 
  className = "",
  animate = true
}) => {
  const baseClasses = `text-white ${className}`;
  const animationClass = animate ? getAnimationClass(condition) : '';
  
  const iconClasses = `${baseClasses} ${animationClass}`;
  
  switch (condition) {
    case 'sunny':
      return <Sun size={size} className={`${iconClasses} text-weather-sunny`} />;
    
    case 'cloudy':
      return <Cloud size={size} className={`${iconClasses} text-weather-cloudy`} />;
    
    case 'rainy':
      return <CloudRain size={size} className={`${iconClasses} text-weather-rainy`} />;
    
    case 'snowy':
      return <CloudSnow size={size} className={`${iconClasses} text-weather-snowy`} />;
    
    case 'stormy':
      return <CloudLightning size={size} className={`${iconClasses} text-weather-stormy`} />;
    
    default:
      return <Cloudy size={size} className={iconClasses} />;
  }
};

function getAnimationClass(condition: WeatherCondition): string {
  switch (condition) {
    case 'sunny':
      return 'animate-spin-slow';
    case 'cloudy':
      return 'animate-pulse-slow';
    case 'rainy':
      return 'animate-bounce-slow';
    case 'snowy':
      return 'animate-float';
    case 'stormy':
      return 'animate-pulse-slow';
    default:
      return '';
  }
}
