
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WeatherCard } from '../components/WeatherCard';
import { SearchBar } from '../components/SearchBar';
import { Background } from '../components/Background';
import { DateRangeSelector } from '../components/DateRangeSelector';
import { InfoDialog } from '../components/InfoDialog';
import { useGeolocation } from '../hooks/useGeolocation';
import { getWeatherData, validateLocation } from '../services/weatherService';
import { WeatherData, mapConditionCode } from '../types/weather';
import { saveWeatherRecord } from '../services/dbService';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { 
  History, 
  Bookmark, 
  Save, 
  MapPin, 
  Database
} from 'lucide-react';

// Replace this with your actual name
const DEVELOPER_NAME = "Your Name";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { coords, isLoading: isLoadingLocation, error: locationError, getLocationString } = useGeolocation();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Fetch weather data
  const fetchWeather = async (query: string) => {
    if (!query) return;
    
    setIsLoading(true);
    try {
      const data = await getWeatherData(query);
      setWeatherData(data);
      setSearchQuery(query);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    fetchWeather(location);
  };

  // Handle using current location
  const handleUseCurrentLocation = () => {
    const locationString = getLocationString();
    if (locationString) {
      fetchWeather(locationString);
    } else if (locationError) {
      toast.error('Could not get your location. Please allow location access or search manually.');
    } else {
      toast.loading('Getting your location...');
    }
  };

  // Initial load with geolocation
  useEffect(() => {
    // Only attempt to load with geolocation on first render
    if (!initialLoadComplete && !isLoadingLocation && !locationError) {
      const locationString = getLocationString();
      if (locationString) {
        fetchWeather(locationString);
      }
      setInitialLoadComplete(true);
    }
  }, [isLoadingLocation, locationError, initialLoadComplete]);

  // Display error for location
  useEffect(() => {
    if (locationError && !initialLoadComplete) {
      toast.error('Could not get your location. Please allow location access or search manually.', {
        id: 'location-error'
      });
      setInitialLoadComplete(true);
    }
  }, [locationError, initialLoadComplete]);

  // Save current weather data to database
  const saveWeatherSearch = async () => {
    if (!weatherData) {
      toast.error('No weather data to save');
      return;
    }

    // Validate dates
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }

    if (startDate > endDate) {
      toast.error('Start date cannot be after end date');
      return;
    }

    // Validate location
    const isValidLocation = await validateLocation(searchQuery);
    if (!isValidLocation) {
      toast.error('Please search for a valid location first');
      return;
    }

    // Save to database
    try {
      const record = saveWeatherRecord({
        location: weatherData.location.name,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        searchDate: new Date().toISOString(),
        weatherData,
      });

      toast.success('Weather data saved successfully');
      
      // Reset date inputs
      setStartDate(undefined);
      setEndDate(undefined);
    } catch (error) {
      console.error('Error saving weather data:', error);
      toast.error('Failed to save weather data');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background based on weather condition */}
      <Background 
        condition={weatherData ? mapConditionCode(weatherData.current.condition.code) : 'cloudy'} 
      />
      
      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-12 min-h-screen">
        <header className="mb-8 pt-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold font-display text-white text-shadow">Weather Forecast</h1>
              <InfoDialog userName={DEVELOPER_NAME} />
            </div>
            <Link to="/history">
              <Button variant="outline" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                <History size={16} />
                Search History
              </Button>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto">
            <SearchBar 
              onLocationSelect={handleLocationSelect}
              onUseCurrentLocation={handleUseCurrentLocation}
            />
          </div>
        </header>
        
        <main className="py-4">
          {/* Initial state */}
          {!weatherData && !isLoading && (
            <div className="text-center py-16 glass-panel rounded-2xl animate-fade-in">
              <p className="text-xl text-white/80">
                {initialLoadComplete 
                  ? 'Search for a location to see the weather forecast' 
                  : 'Loading your location...'}
              </p>
            </div>
          )}
          
          {/* Weather card */}
          {(weatherData || isLoading) && (
            <>
              <WeatherCard data={weatherData as WeatherData} isLoading={isLoading} />
              
              {/* Date range and save section */}
              {weatherData && !isLoading && (
                <div className="mt-8 glass-panel rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Database size={20} className="mr-2" />
                    Save Weather Information
                  </h2>
                  <p className="text-white/80 mb-4">
                    Select a date range and save this weather information to your history.
                  </p>
                  
                  <div className="space-y-4">
                    <DateRangeSelector
                      startDate={startDate}
                      endDate={endDate}
                      onStartDateChange={setStartDate}
                      onEndDateChange={setEndDate}
                    />
                    
                    <Button 
                      onClick={saveWeatherSearch} 
                      className="w-full gap-2"
                      disabled={!startDate || !endDate}
                    >
                      <Save size={16} />
                      Save Weather Data
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
        
        <footer className="mt-12 text-center text-white/60 text-sm">
          <p>Developed by Vinay Kumar | Weather data provided by WeatherAPI.com</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
