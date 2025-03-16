/**
 * Local storage utilities for persisting application data
 */

// Storage keys
export const STORAGE_KEYS = {
  APPLICATIONS: 'job_hunt_applications',
  EXPERIENCES: 'job_hunt_experiences',
  RESUMES: 'job_hunt_resumes',
  ROLE_TYPES: 'job_hunt_role_types',
  CONTACTS: 'job_hunt_contacts',
};

// Generic function to get data from local storage
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Generic function to save data to local storage
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Function to generate a unique ID
export function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : 
    Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
}

// Helper to export all data as JSON
export function exportAllData(): string {
  if (typeof window === 'undefined') {
    return '{}';
  }
  
  const exportData = {
    applications: getFromStorage(STORAGE_KEYS.APPLICATIONS, []),
    experiences: getFromStorage(STORAGE_KEYS.EXPERIENCES, []),
    resumes: getFromStorage(STORAGE_KEYS.RESUMES, []),
    roleTypes: getFromStorage(STORAGE_KEYS.ROLE_TYPES, []),
    contacts: getFromStorage(STORAGE_KEYS.CONTACTS, []),
  };
  
  return JSON.stringify(exportData, null, 2);
}

// Helper to import all data from JSON
export function importAllData(jsonData: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const data = JSON.parse(jsonData);
    
    if (data.applications) {
      saveToStorage(STORAGE_KEYS.APPLICATIONS, data.applications);
    }
    
    if (data.experiences) {
      saveToStorage(STORAGE_KEYS.EXPERIENCES, data.experiences);
    }
    
    if (data.resumes) {
      saveToStorage(STORAGE_KEYS.RESUMES, data.resumes);
    }
    
    if (data.roleTypes) {
      saveToStorage(STORAGE_KEYS.ROLE_TYPES, data.roleTypes);
    }
    
    if (data.contacts) {
      saveToStorage(STORAGE_KEYS.CONTACTS, data.contacts);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
} 