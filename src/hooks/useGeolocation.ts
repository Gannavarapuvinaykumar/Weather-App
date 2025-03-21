
import { useState, useEffect } from 'react';

interface GeolocationState {
  coords: {
    latitude: number | null;
    longitude: number | null;
  };
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [geolocation, setGeolocation] = useState<GeolocationState>({
    coords: {
      latitude: null,
      longitude: null,
    },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocation({
        ...geolocation,
        isLoading: false,
        error: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setGeolocation({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        isLoading: false,
        error: null,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setGeolocation({
        ...geolocation,
        isLoading: false,
        error: error.message,
      });
    };

    // Use high accuracy for better results
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  }, []);

  const getLocationString = (): string | null => {
    const { latitude, longitude } = geolocation.coords;
    if (latitude !== null && longitude !== null) {
      return `${latitude},${longitude}`;
    }
    return null;
  };

  return { ...geolocation, getLocationString };
}
