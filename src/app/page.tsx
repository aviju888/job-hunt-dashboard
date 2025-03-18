"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { RoleTabs } from "@/components/dashboard/role-tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const [isNewApplicationOpen, setIsNewApplicationOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your job hunt progress
          </p>
        </div>
        <Button onClick={() => setIsNewApplicationOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      <DashboardStats />
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <RoleTabs />
        <RecentApplications />
      </div>

      <Dialog open={isNewApplicationOpen} onOpenChange={setIsNewApplicationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Application form will be implemented here
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
} 