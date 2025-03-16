import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationStatus } from "@/types";
import { useApplications, useRoleTypes } from "@/context";
import { ApplicationForm } from "@/components/applications/application-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ApplicationsPage() {
  const { applications, getApplicationsByStatus } = useApplications();
  const { getRoleType } = useRoleTypes();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/10 text-blue-500";
      case "phone_screen":
      case "interview":
        return "bg-purple-500/10 text-purple-500";
      case "technical_assessment":
        return "bg-yellow-500/10 text-yellow-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      case "offer":
      case "accepted":
        return "bg-green-500/10 text-green-500";
      case "withdrawn":
        return "bg-gray-500/10 text-gray-500";
      case "negotiation":
        return "bg-orange-500/10 text-orange-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatStatus = (status: ApplicationStatus): string => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
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

      {applications.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium mb-4">No Applications Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start tracking your job applications by adding one below
          </p>
          <Button onClick={() => setIsFormOpen(true)}>
            Add Your First Application
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ApplicationTable 
              applications={applications}
              getStatusColor={getStatusColor}
              formatStatus={formatStatus}
              getRoleType={getRoleType}
            />
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            <ApplicationTable 
              applications={[
                ...getApplicationsByStatus('interested'),
                ...getApplicationsByStatus('applied'),
                ...getApplicationsByStatus('phone_screen'),
                ...getApplicationsByStatus('interview'),
                ...getApplicationsByStatus('technical_assessment'),
              ]}
              getStatusColor={getStatusColor}
              formatStatus={formatStatus}
              getRoleType={getRoleType}
            />
          </TabsContent>
          
          <TabsContent value="interviews" className="mt-4">
            <ApplicationTable 
              applications={[
                ...getApplicationsByStatus('phone_screen'),
                ...getApplicationsByStatus('interview'),
                ...getApplicationsByStatus('technical_assessment'),
              ]}
              getStatusColor={getStatusColor}
              formatStatus={formatStatus}
              getRoleType={getRoleType}
            />
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-4">
            <ApplicationTable 
              applications={getApplicationsByStatus('rejected')}
              getStatusColor={getStatusColor}
              formatStatus={formatStatus}
              getRoleType={getRoleType}
            />
          </TabsContent>
          
          <TabsContent value="offers" className="mt-4">
            <ApplicationTable 
              applications={[
                ...getApplicationsByStatus('offer'),
                ...getApplicationsByStatus('negotiation'),
                ...getApplicationsByStatus('accepted'),
              ]}
              getStatusColor={getStatusColor}
              formatStatus={formatStatus}
              getRoleType={getRoleType}
            />
          </TabsContent>
        </Tabs>
      )}
    </MainLayout>
  );
}

interface ApplicationTableProps {
  applications: any[];
  getStatusColor: (status: ApplicationStatus) => string;
  formatStatus: (status: ApplicationStatus) => string;
  getRoleType: (id: string) => any | undefined;
}

function ApplicationTable({ applications, getStatusColor, formatStatus, getRoleType }: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No applications in this category
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Role Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => {
          const roleType = getRoleType(app.roleType);
          return (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.company}</TableCell>
              <TableCell>{app.position}</TableCell>
              <TableCell>
                {roleType ? (
                  <Badge variant="outline">{roleType.title}</Badge>
                ) : (
                  <Badge variant="outline">Unknown</Badge>
                )}
              </TableCell>
              <TableCell>{app.location}</TableCell>
              <TableCell>{app.dateApplied || 'Not yet applied'}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(app.status)}>
                  {formatStatus(app.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
} 