"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Application, ApplicationStatus } from '@/types';
import { STORAGE_KEYS, getFromStorage, saveToStorage, generateId } from '@/lib/storage';

interface ApplicationsContextType {
  applications: Application[];
  isLoading: boolean;
  addApplication: (application: Omit<Application, 'id'>) => Application;
  updateApplication: (id: string, application: Partial<Application>) => Application | null;
  deleteApplication: (id: string) => boolean;
  getApplication: (id: string) => Application | undefined;
  getApplicationsByRoleType: (roleTypeId: string) => Application[];
  getApplicationsByStatus: (status: ApplicationStatus) => Application[];
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load applications from local storage
  useEffect(() => {
    const storedApplications = getFromStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    setApplications(storedApplications);
    setIsLoading(false);
  }, []);

  // Save applications to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.APPLICATIONS, applications);
    }
  }, [applications, isLoading]);

  // Add a new application
  const addApplication = useCallback((applicationData: Omit<Application, 'id'>): Application => {
    const newApplication: Application = {
      ...applicationData,
      id: generateId(),
      dateIdentified: applicationData.dateIdentified || new Date().toISOString().split('T')[0],
    };
    
    setApplications(prev => [...prev, newApplication]);
    return newApplication;
  }, []);

  // Update an existing application
  const updateApplication = useCallback((id: string, updates: Partial<Application>): Application | null => {
    let updatedApplication: Application | null = null;
    
    setApplications(prev => {
      const updatedApplications = prev.map(app => {
        if (app.id === id) {
          updatedApplication = { ...app, ...updates };
          return updatedApplication;
        }
        return app;
      });
      
      return updatedApplications;
    });
    
    return updatedApplication;
  }, []);

  // Delete an application
  const deleteApplication = useCallback((id: string): boolean => {
    let deleted = false;
    
    setApplications(prev => {
      const filteredApplications = prev.filter(app => {
        if (app.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      
      return filteredApplications;
    });
    
    return deleted;
  }, []);

  // Get a single application by ID
  const getApplication = useCallback((id: string): Application | undefined => {
    return applications.find(app => app.id === id);
  }, [applications]);

  // Get applications by role type
  const getApplicationsByRoleType = useCallback((roleTypeId: string): Application[] => {
    return applications.filter(app => app.roleType === roleTypeId);
  }, [applications]);

  // Get applications by status
  const getApplicationsByStatus = useCallback((status: ApplicationStatus): Application[] => {
    return applications.filter(app => app.status === status);
  }, [applications]);

  const value = {
    applications,
    isLoading,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplication,
    getApplicationsByRoleType,
    getApplicationsByStatus,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
} 