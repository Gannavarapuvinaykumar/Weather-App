
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { searchLocations } from '../services/weatherService';
import { LocationSuggestion } from '../types/weather';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  onUseCurrentLocation: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect, onUseCurrentLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Handle clicks outside of the search component
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await searchLocations(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [query]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query);
      setIsFocused(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const locationString = `${suggestion.lat},${suggestion.lon}`;
    onLocationSelect(locationString);
    setQuery(`${suggestion.name}, ${suggestion.region}, ${suggestion.country}`);
    setSuggestions([]);
    setIsFocused(false);
  };
  
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };
  
  return (
    <div 
      ref={searchRef}
      className="relative w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search 
            className="absolute left-3 text-primary/60" 
            size={18} 
          />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search city, zip code, or place..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 
                       text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 
                       focus:ring-primary/50 shadow-lg transition-all duration-300"
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 text-primary/60 hover:text-primary transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <button
          type="button"
          onClick={onUseCurrentLocation}
          className="absolute right-[-54px] top-0 bg-white/20 backdrop-blur-lg border border-white/30 
                     rounded-xl p-3 text-primary hover:bg-white/30 transition-colors shadow-lg"
          aria-label="Use current location"
        >
          <MapPin size={18} />
        </button>
      </form>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white/20 backdrop-blur-xl border border-white/30 
                        rounded-xl shadow-xl overflow-hidden animate-fade-in">
          <ul className="max-h-72 overflow-auto py-1">
            {suggestions.map((suggestion) => (
              <li key={`${suggestion.id}-${suggestion.name}`}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-white/20 transition-colors flex items-center"
                >
                  <MapPin size={16} className="mr-2 flex-shrink-0 text-primary/70" />
                  <div>
                    <p className="font-medium">{suggestion.name}</p>
                    <p className="text-sm text-foreground/70">
                      {suggestion.region}, {suggestion.country}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
