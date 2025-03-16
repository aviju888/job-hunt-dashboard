import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { RoleTabs } from "@/components/dashboard/role-tabs";
import { useApplications, useRoleTypes, useResumes } from "@/context";
import { ApplicationForm } from "@/components/applications/application-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { applications } = useApplications();
  const { roleTypes } = useRoleTypes();
  const { resumes } = useResumes();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your job hunt progress
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>+ New Application</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add New Application</DialogTitle>
              <DialogDescription>
                Enter the details of the job you're applying for
              </DialogDescription>
            </DialogHeader>
            <ApplicationForm onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <DashboardStats 
        applicationCount={applications.length}
        interviewCount={applications.filter(app => app.status === 'interview' || app.status === 'technical_assessment').length}
        responseRate={applications.length > 0 ? 
          Math.round((applications.filter(app => app.status !== 'applied' && app.status !== 'interested').length / applications.length) * 100) : 
          0
        }
        resumeCount={resumes.length}
      />
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <RoleTabs roleTypes={roleTypes} />
        <RecentApplications applications={applications.slice(0, 5)} />
      </div>
    </MainLayout>
  );
} 