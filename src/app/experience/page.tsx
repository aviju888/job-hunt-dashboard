import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExperiencePage() {
  // Mock data
  const experiences = [
    {
      id: "exp1",
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      dateStart: "2021-06",
      dateEnd: "present",
      description: ["Led development of React-based dashboard", "Optimized performance by 40%", "Mentored junior developers"],
      skills: ["React", "TypeScript", "Redux", "Performance Optimization"],
      category: "work",
    },
    {
      id: "exp2",
      title: "Frontend Developer",
      company: "Web Innovations",
      dateStart: "2019-03",
      dateEnd: "2021-05",
      description: ["Developed responsive web applications", "Implemented UI components library", "Collaborated with design team"],
      skills: ["JavaScript", "React", "CSS", "Responsive Design"],
      category: "work",
    },
    {
      id: "exp3",
      title: "Personal Portfolio Website",
      company: null,
      dateStart: "2022-01",
      dateEnd: "2022-03",
      description: ["Built portfolio website using Next.js", "Implemented animations and transitions", "Optimized for accessibility"],
      skills: ["Next.js", "Tailwind CSS", "Framer Motion", "Accessibility"],
      category: "project",
    },
    {
      id: "exp4",
      title: "Bachelor of Computer Science",
      company: "Tech University",
      dateStart: "2015-09",
      dateEnd: "2019-05",
      description: ["GPA: 3.8/4.0", "Focus on Human-Computer Interaction", "Senior project: Interactive data visualization tool"],
      skills: ["Algorithms", "Data Structures", "UI/UX Design"],
      category: "education",
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Experience Bank</h1>
          <p className="text-muted-foreground">
            Manage your work history, projects, and education
          </p>
        </div>
        <Button>+ Add Experience</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="work">Work Experience</TabsTrigger>
          <TabsTrigger value="project">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((exp) => (
              <Card key={exp.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{exp.title}</CardTitle>
                      {exp.company && (
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      )}
                    </div>
                    <Badge className="capitalize">
                      {exp.category}
                    </Badge>
                  </div>
                  <p className="text-sm">
                    {exp.dateStart} - {exp.dateEnd}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge variant="outline" key={skill}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Other tab contents would be similar but filtered by category */}
      </Tabs>
    </MainLayout>
  );
} 