"use client";

import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApplications } from "@/context";
import { ApplicationStatus } from "@/types";
import { formatDate } from "@/lib/utils";

export function RecentApplications() {
  const { applications } = useApplications();
  
  // Sort applications by date and take the most recent 5
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.dateIdentified).getTime() - new Date(a.dateIdentified).getTime())
    .slice(0, 5);

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "interested":
        return "bg-gray-500/10 text-gray-500";
      case "applied":
        return "bg-blue-500/10 text-blue-500";
      case "phone_screen":
      case "interview":
      case "technical_assessment":
        return "bg-purple-500/10 text-purple-500";
      case "rejected":
      case "withdrawn":
        return "bg-red-500/10 text-red-500";
      case "offer":
      case "negotiation":
        return "bg-amber-500/10 text-amber-500";
      case "accepted":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };
  
  const formatStatus = (status: ApplicationStatus) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (applications.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-muted-foreground">No applications yet. Start tracking your job hunt!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.dateApplied ? formatDate(app.dateApplied) : 'Not applied'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>
                      {formatStatus(app.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 