"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApplications, useRoleTypes } from "@/context";

export function RoleTabs() {
  const { roleTypes } = useRoleTypes();
  const { getApplicationsByRoleType } = useApplications();

  if (roleTypes.length === 0) {
    return (
      <Card className="p-6 text-center mb-6">
        <h3 className="text-lg font-medium mb-2">No Role Types Defined</h3>
        <p className="text-muted-foreground mb-4">
          Define role types to organize your job search by position type
        </p>
        <Button>Add Role Type</Button>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <Tabs defaultValue={roleTypes[0]?.id} className="w-full">
        <div className="px-6 pt-6 pb-2 border-b">
          <TabsList className="mb-4">
            {roleTypes.map((role) => (
              <TabsTrigger key={role.id} value={role.id}>
                {role.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {roleTypes.map((role) => {
          const applications = getApplicationsByRoleType(role.id);
          
          return (
            <TabsContent key={role.id} value={role.id} className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {applications.length} active applications
                  </p>
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.requiredSkills.length > 0 ? (
                        role.requiredSkills.map((skill) => (
                          <Badge variant="outline" key={skill}>
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No required skills defined</p>
                      )}
                    </div>
                  </div>
                  <Button size="sm">View Applications</Button>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Create Resume for this Role
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Search Jobs Matching Skills
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Add Required Skill
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
} 