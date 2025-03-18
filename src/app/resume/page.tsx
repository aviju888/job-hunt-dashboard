import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
  // Mock data
  const resumes = [
    {
      id: "res1",
      name: "Frontend Developer Resume",
      targetRole: "Frontend Developer",
      lastUpdated: "2024-03-15",
      experienceCount: 5,
      tailoredFor: null,
    },
    {
      id: "res2",
      name: "Full Stack Developer Resume",
      targetRole: "Full Stack Engineer",
      lastUpdated: "2024-03-10",
      experienceCount: 6,
      tailoredFor: null,
    },
    {
      id: "res3",
      name: "Google Application",
      targetRole: "Frontend Developer",
      lastUpdated: "2024-03-08",
      experienceCount: 4,
      tailoredFor: "Google",
    },
    {
      id: "res4",
      name: "Microsoft Application",
      targetRole: "Full Stack Engineer",
      lastUpdated: "2024-03-05",
      experienceCount: 5,
      tailoredFor: "Microsoft",
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Resume Manager</h1>
          <p className="text-muted-foreground">
            Create and manage multiple resume versions
          </p>
        </div>
        <Button>+ Create Resume</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{resume.name}</CardTitle>
                {resume.tailoredFor && (
                  <Badge variant="secondary">
                    {resume.tailoredFor}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{resume.targetRole}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>{resume.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experiences:</span>
                  <span>{resume.experienceCount}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
              <Button variant="outline" size="sm" className="flex-1">Preview</Button>
              <Button size="sm" className="flex-1">Export</Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Resume Card */}
        <Card className="flex flex-col justify-center items-center p-6 border-dashed">
          <div className="text-center mb-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">+</span>
            </div>
            <h3 className="font-medium">New Resume</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create a customized resume
            </p>
          </div>
          <Button variant="outline">Create Resume</Button>
        </Card>
      </div>
    </MainLayout>
  );
} 