
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
    vis_km: number;
    cloud: number;
  };
  forecast?: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    totalprecip_mm: number;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

export interface LocationSuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export type WeatherCondition = 
  | 'sunny' 
  | 'cloudy' 
  | 'rainy' 
  | 'snowy' 
  | 'stormy';

export function mapConditionCode(code: number): WeatherCondition {
  // Sunny
  if ([1000].includes(code)) {
    return 'sunny';
  }
  // Cloudy
  else if ([1003, 1006, 1009, 1030, 1135, 1147].includes(code)) {
    return 'cloudy';
  }
  // Rainy
  else if ([1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) {
    return 'rainy';
  }
  // Snowy
  else if ([1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) {
    return 'snowy';
  }
  // Stormy
  else if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return 'stormy';
  }
  // Default
  else {
    return 'cloudy';
  }
}
