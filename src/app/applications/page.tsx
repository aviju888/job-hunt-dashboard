import React from "react";
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

export default function ApplicationsPage() {
  // Mock data
  const applications = [
    {
      company: "TechCorp",
      position: "Frontend Developer",
      dateApplied: "2024-03-12",
      status: "applied",
      location: "San Francisco, CA",
      role: "Frontend Developer",
    },
    {
      company: "InnoSoft",
      position: "React Developer",
      dateApplied: "2024-03-10",
      status: "interview",
      location: "Remote",
      role: "Frontend Developer",
    },
    {
      company: "DataViz Inc",
      position: "UI/UX Engineer",
      dateApplied: "2024-03-08",
      status: "rejected",
      location: "New York, NY",
      role: "UX Engineer",
    },
    {
      company: "CloudTech",
      position: "Frontend Engineer",
      dateApplied: "2024-03-05",
      status: "offer",
      location: "Seattle, WA",
      role: "Frontend Developer",
    },
    {
      company: "WebSolutions",
      position: "Full Stack Developer",
      dateApplied: "2024-03-02",
      status: "applied",
      location: "Austin, TX",
      role: "Full Stack Engineer",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/10 text-blue-500";
      case "interview":
        return "bg-purple-500/10 text-purple-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      case "offer":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
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
        <Button>+ New Application</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
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
              {applications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.role}</Badge>
                  </TableCell>
                  <TableCell>{app.location}</TableCell>
                  <TableCell>{app.dateApplied}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        {/* Other tab contents would be similar */}
      </Tabs>
    </MainLayout>
  );
} 