"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ExperienceEntry, ExperienceCategory } from '@/types';
import { STORAGE_KEYS, getFromStorage, saveToStorage, generateId } from '@/lib/storage';

interface ExperienceContextType {
  experiences: ExperienceEntry[];
  isLoading: boolean;
  addExperience: (experience: Omit<ExperienceEntry, 'id'>) => ExperienceEntry;
  updateExperience: (id: string, experience: Partial<ExperienceEntry>) => ExperienceEntry | null;
  deleteExperience: (id: string) => boolean;
  getExperience: (id: string) => ExperienceEntry | undefined;
  getExperiencesByCategory: (category: ExperienceCategory) => ExperienceEntry[];
  getExperiencesBySkills: (skills: string[]) => ExperienceEntry[];
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load experiences from local storage
  useEffect(() => {
    const storedExperiences = getFromStorage<ExperienceEntry[]>(STORAGE_KEYS.EXPERIENCES, []);
    setExperiences(storedExperiences);
    setIsLoading(false);
  }, []);

  // Save experiences to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.EXPERIENCES, experiences);
    }
  }, [experiences, isLoading]);

  // Add a new experience entry
  const addExperience = useCallback((experienceData: Omit<ExperienceEntry, 'id'>): ExperienceEntry => {
    const newExperience: ExperienceEntry = {
      ...experienceData,
      id: generateId(),
    };
    
    setExperiences(prev => [...prev, newExperience]);
    return newExperience;
  }, []);

  // Update an existing experience entry
  const updateExperience = useCallback((id: string, updates: Partial<ExperienceEntry>): ExperienceEntry | null => {
    let updatedExperience: ExperienceEntry | null = null;
    
    setExperiences(prev => {
      const updatedExperiences = prev.map(exp => {
        if (exp.id === id) {
          updatedExperience = { ...exp, ...updates };
          return updatedExperience;
        }
        return exp;
      });
      
      return updatedExperiences;
    });
    
    return updatedExperience;
  }, []);

  // Delete an experience entry
  const deleteExperience = useCallback((id: string): boolean => {
    let deleted = false;
    
    setExperiences(prev => {
      const filteredExperiences = prev.filter(exp => {
        if (exp.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      
      return filteredExperiences;
    });
    
    return deleted;
  }, []);

  // Get a single experience by ID
  const getExperience = useCallback((id: string): ExperienceEntry | undefined => {
    return experiences.find(exp => exp.id === id);
  }, [experiences]);

  // Get experiences by category
  const getExperiencesByCategory = useCallback((category: ExperienceCategory): ExperienceEntry[] => {
    return experiences.filter(exp => exp.category === category);
  }, [experiences]);

  // Get experiences that include specific skills
  const getExperiencesBySkills = useCallback((skills: string[]): ExperienceEntry[] => {
    return experiences.filter(exp => 
      skills.some(skill => exp.skills.includes(skill))
    );
  }, [experiences]);

  const value = {
    experiences,
    isLoading,
    addExperience,
    updateExperience,
    deleteExperience,
    getExperience,
    getExperiencesByCategory,
    getExperiencesBySkills,
  };

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperiences() {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperiences must be used within an ExperienceProvider');
  }
  return context;
} 