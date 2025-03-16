import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardStatsProps {
  applicationCount: number;
  interviewCount: number;
  responseRate: number;
  resumeCount: number;
}

export function DashboardStats({ 
  applicationCount, 
  interviewCount, 
  responseRate, 
  resumeCount 
}: DashboardStatsProps) {
  // Define stats based on props
  const stats = [
    {
      title: "Total Applications",
      value: applicationCount,
      change: "+4 this week", // This would be calculated in a real app
    },
    {
      title: "Interviews",
      value: interviewCount,
      change: "+2 this week", // This would be calculated in a real app
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      progress: responseRate,
    },
    {
      title: "Resumes",
      value: resumeCount,
      change: "Last updated today", // This would be calculated in a real app
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