
import { WeatherData, LocationSuggestion } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;// WeatherAPI.com free tier key
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetches current weather and forecast data for a location
 */
export async function getWeatherData(query: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    throw new Error(error.message || 'Failed to fetch weather data');
  }
}

/**
 * Fetches weather data for a specific date range (history)
 * Note: Free tier has limitations, so this is a simplified version
 */
export async function getWeatherHistory(
  query: string, 
  startDate: string, 
  endDate: string
): Promise<WeatherData> {
  // For demonstration, we'll use the forecast API instead of history API
  // as history API might be restricted in the free tier
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error fetching weather history:', error);
    throw new Error(error.message || 'Failed to fetch weather history');
  }
}

/**
 * Searches for location suggestions based on user input
 */
export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to search locations');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error searching locations:', error);
    return [];
  }
}

/**
 * Validates if a location exists
 */
export async function validateLocation(query: string): Promise<boolean> {
  try {
    const locations = await searchLocations(query);
    return locations.length > 0;
  } catch (error) {
    return false;
  }
}
