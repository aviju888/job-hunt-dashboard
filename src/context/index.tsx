"use client";

import React from 'react';
import { ApplicationsProvider } from './ApplicationsContext';
import { ExperienceProvider } from './ExperienceContext';
import { ResumeProvider } from './ResumeContext';
import { RoleTypeProvider } from './RoleTypeContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ApplicationsProvider>
      <ExperienceProvider>
        <ResumeProvider>
          <RoleTypeProvider>
            {children}
          </RoleTypeProvider>
        </ResumeProvider>
      </ExperienceProvider>
    </ApplicationsProvider>
  );
}

// Export all context hooks for easy access
export { useApplications } from './ApplicationsContext';
export { useExperiences } from './ExperienceContext';
export { useResumes } from './ResumeContext';
export { useRoleTypes } from './RoleTypeContext'; 