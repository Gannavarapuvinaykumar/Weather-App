
import { WeatherData } from './weather';

export interface WeatherHistoryRecord {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  searchDate: string; // When the search was performed
  weatherData: WeatherData;
}

export interface WeatherHistoryFilter {
  location?: string;
  startDate?: string;
  endDate?: string;
}
