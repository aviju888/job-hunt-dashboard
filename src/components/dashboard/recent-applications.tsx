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
import { Application, ApplicationStatus } from "@/types";
import { useRoleTypes } from "@/context";

interface RecentApplicationsProps {
  applications: Application[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  const { getRoleType } = useRoleTypes();

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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No applications found. Start by adding your first application.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Role Type</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
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
                    <TableCell>{app.dateApplied || 'Not yet applied'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>
                        {formatStatus(app.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 