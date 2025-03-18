"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RoleType } from '@/types';
import { STORAGE_KEYS, getFromStorage, saveToStorage, generateId } from '@/lib/storage';

interface RoleTypeContextType {
  roleTypes: RoleType[];
  isLoading: boolean;
  addRoleType: (roleType: Omit<RoleType, 'id'>) => RoleType;
  updateRoleType: (id: string, roleType: Partial<RoleType>) => RoleType | null;
  deleteRoleType: (id: string) => boolean;
  getRoleType: (id: string) => RoleType | undefined;
  getRoleTypesByIndustry: (industry: string) => RoleType[];
}

const RoleTypeContext = createContext<RoleTypeContextType | undefined>(undefined);

export function RoleTypeProvider({ children }: { children: React.ReactNode }) {
  const [roleTypes, setRoleTypes] = useState<RoleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load role types from local storage
  useEffect(() => {
    const storedRoleTypes = getFromStorage<RoleType[]>(STORAGE_KEYS.ROLE_TYPES, []);
    setRoleTypes(storedRoleTypes);
    setIsLoading(false);
  }, []);

  // Save role types to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.ROLE_TYPES, roleTypes);
    }
  }, [roleTypes, isLoading]);

  // Add a new role type
  const addRoleType = useCallback((roleTypeData: Omit<RoleType, 'id'>): RoleType => {
    const newRoleType: RoleType = {
      ...roleTypeData,
      id: generateId(),
    };
    
    setRoleTypes(prev => [...prev, newRoleType]);
    return newRoleType;
  }, []);

  // Update an existing role type
  const updateRoleType = useCallback((id: string, updates: Partial<RoleType>): RoleType | null => {
    let updatedRoleType: RoleType | null = null;
    
    setRoleTypes(prev => {
      const updatedRoleTypes = prev.map(roleType => {
        if (roleType.id === id) {
          updatedRoleType = { ...roleType, ...updates };
          return updatedRoleType;
        }
        return roleType;
      });
      
      return updatedRoleTypes;
    });
    
    return updatedRoleType;
  }, []);

  // Delete a role type
  const deleteRoleType = useCallback((id: string): boolean => {
    let deleted = false;
    
    setRoleTypes(prev => {
      const filteredRoleTypes = prev.filter(roleType => {
        if (roleType.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      
      return filteredRoleTypes;
    });
    
    return deleted;
  }, []);

  // Get a single role type by ID
  const getRoleType = useCallback((id: string): RoleType | undefined => {
    return roleTypes.find(roleType => roleType.id === id);
  }, [roleTypes]);

  // Get role types by industry
  const getRoleTypesByIndustry = useCallback((industry: string): RoleType[] => {
    return roleTypes.filter(roleType => roleType.industry === industry);
  }, [roleTypes]);

  const value = {
    roleTypes,
    isLoading,
    addRoleType,
    updateRoleType,
    deleteRoleType,
    getRoleType,
    getRoleTypesByIndustry,
  };

  return (
    <RoleTypeContext.Provider value={value}>
      {children}
    </RoleTypeContext.Provider>
  );
}

export function useRoleTypes() {
  const context = useContext(RoleTypeContext);
  if (context === undefined) {
    throw new Error('useRoleTypes must be used within a RoleTypeProvider');
  }
  return context;
} 