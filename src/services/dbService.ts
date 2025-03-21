
import { WeatherHistoryRecord, WeatherHistoryFilter } from '../types/weatherHistory';

const STORAGE_KEY = 'weather_history';

// Helper to get all records
const getAllRecords = (): WeatherHistoryRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save all records
const saveAllRecords = (records: WeatherHistoryRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

// CREATE: Save a weather search record
export const saveWeatherRecord = (record: Omit<WeatherHistoryRecord, 'id'>): WeatherHistoryRecord => {
  const records = getAllRecords();
  const newRecord = {
    ...record,
    id: Date.now().toString(), // Generate a simple unique ID
  };
  
  records.push(newRecord);
  saveAllRecords(records);
  return newRecord;
};

// READ: Get all weather records with optional filtering
export const getWeatherRecords = (filter?: WeatherHistoryFilter): WeatherHistoryRecord[] => {
  let records = getAllRecords();
  
  if (filter) {
    if (filter.location) {
      records = records.filter(record => 
        record.location.toLowerCase().includes(filter.location!.toLowerCase())
      );
    }
    
    if (filter.startDate) {
      records = records.filter(record => 
        new Date(record.startDate) >= new Date(filter.startDate!)
      );
    }
    
    if (filter.endDate) {
      records = records.filter(record => 
        new Date(record.endDate) <= new Date(filter.endDate!)
      );
    }
  }
  
  // Sort by most recent first
  return records.sort((a, b) => 
    new Date(b.searchDate).getTime() - new Date(a.searchDate).getTime()
  );
};

// READ: Get a single record by ID
export const getWeatherRecordById = (id: string): WeatherHistoryRecord | undefined => {
  const records = getAllRecords();
  return records.find(record => record.id === id);
};

// UPDATE: Update an existing record
export const updateWeatherRecord = (
  id: string, 
  updates: Partial<Omit<WeatherHistoryRecord, 'id'>>
): WeatherHistoryRecord | null => {
  const records = getAllRecords();
  const index = records.findIndex(record => record.id === id);
  
  if (index === -1) return null;
  
  const updatedRecord = {
    ...records[index],
    ...updates,
  };
  
  records[index] = updatedRecord;
  saveAllRecords(records);
  return updatedRecord;
};

// DELETE: Remove a record by ID
export const deleteWeatherRecord = (id: string): boolean => {
  const records = getAllRecords();
  const filteredRecords = records.filter(record => record.id !== id);
  
  if (filteredRecords.length === records.length) {
    return false; // No record was deleted
  }
  
  saveAllRecords(filteredRecords);
  return true;
};

// DELETE: Clear all records
export const clearAllWeatherRecords = (): void => {
  saveAllRecords([]);
};
