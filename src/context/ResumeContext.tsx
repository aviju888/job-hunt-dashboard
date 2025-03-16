import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Resume } from '@/types';
import { STORAGE_KEYS, getFromStorage, saveToStorage, generateId } from '@/lib/storage';

interface ResumeContextType {
  resumes: Resume[];
  isLoading: boolean;
  addResume: (resume: Omit<Resume, 'id' | 'createdAt' | 'lastUpdated'>) => Resume;
  updateResume: (id: string, resume: Partial<Resume>) => Resume | null;
  deleteResume: (id: string) => boolean;
  getResume: (id: string) => Resume | undefined;
  getResumesByRoleType: (roleType: string) => Resume[];
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load resumes from local storage
  useEffect(() => {
    const storedResumes = getFromStorage<Resume[]>(STORAGE_KEYS.RESUMES, []);
    setResumes(storedResumes);
    setIsLoading(false);
  }, []);

  // Save resumes to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.RESUMES, resumes);
    }
  }, [resumes, isLoading]);

  // Add a new resume
  const addResume = useCallback((resumeData: Omit<Resume, 'id' | 'createdAt' | 'lastUpdated'>): Resume => {
    const currentDate = new Date().toISOString();
    
    const newResume: Resume = {
      ...resumeData,
      id: generateId(),
      createdAt: currentDate,
      lastUpdated: currentDate,
    };
    
    setResumes(prev => [...prev, newResume]);
    return newResume;
  }, []);

  // Update an existing resume
  const updateResume = useCallback((id: string, updates: Partial<Resume>): Resume | null => {
    let updatedResume: Resume | null = null;
    
    setResumes(prev => {
      const updatedResumes = prev.map(resume => {
        if (resume.id === id) {
          updatedResume = { 
            ...resume, 
            ...updates, 
            lastUpdated: new Date().toISOString() 
          };
          return updatedResume;
        }
        return resume;
      });
      
      return updatedResumes;
    });
    
    return updatedResume;
  }, []);

  // Delete a resume
  const deleteResume = useCallback((id: string): boolean => {
    let deleted = false;
    
    setResumes(prev => {
      const filteredResumes = prev.filter(resume => {
        if (resume.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      
      return filteredResumes;
    });
    
    return deleted;
  }, []);

  // Get a single resume by ID
  const getResume = useCallback((id: string): Resume | undefined => {
    return resumes.find(resume => resume.id === id);
  }, [resumes]);

  // Get resumes by role type (target role)
  const getResumesByRoleType = useCallback((roleType: string): Resume[] => {
    return resumes.filter(resume => resume.targetRole === roleType);
  }, [resumes]);

  const value = {
    resumes,
    isLoading,
    addResume,
    updateResume,
    deleteResume,
    getResume,
    getResumesByRoleType,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumes() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumes must be used within a ResumeProvider');
  }
  return context;
} 