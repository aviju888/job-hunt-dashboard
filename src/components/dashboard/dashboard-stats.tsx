"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApplications } from "@/context";

export function DashboardStats() {
  const { applications } = useApplications();
  
  // Calculate stats from real data
  const totalApplications = applications.length;
  
  const interviews = applications.filter(app => 
    app.status === 'phone_screen' || 
    app.status === 'interview' || 
    app.status === 'technical_assessment'
  ).length;
  
  const responseRate = totalApplications > 0 
    ? Math.round((interviews / totalApplications) * 100) 
    : 0;
  
  // Get applications from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];
  
  const newApplications = applications.filter(app => 
    app.dateIdentified >= oneWeekAgoStr
  ).length;
  
  const newInterviews = applications.filter(app => 
    (app.status === 'phone_screen' || app.status === 'interview' || app.status === 'technical_assessment') &&
    app.dateApplied && app.dateApplied >= oneWeekAgoStr
  ).length;
  
  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      change: `+${newApplications} this week`,
    },
    {
      title: "Interviews",
      value: interviews,
      change: `+${newInterviews} this week`,
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      progress: responseRate,
    },
    {
      title: "Active Applications",
      value: applications.filter(app => 
        app.status !== 'rejected' && 
        app.status !== 'withdrawn' && 
        app.status !== 'accepted'
      ).length,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            )}
            {stat.progress !== undefined && (
              <Progress 
                value={stat.progress} 
                className="h-1.5 mt-2" 
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 