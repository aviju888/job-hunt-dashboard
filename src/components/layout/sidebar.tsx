import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  BookOpen,
  Settings,
  Plus
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RoleTypeForm } from "@/components/role-types/role-type-form";

export function Sidebar() {
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Applications",
      href: "/applications",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Experience Bank",
      href: "/experience",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Resume Manager",
      href: "/resume",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Networking",
      href: "/networking",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Resources",
      href: "/resources",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="font-bold text-xl">Job Hunt Dashboard</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 font-normal"
                >
                  {item.icon}
                  {item.title}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 space-y-2 border-t">
        <Dialog open={isRoleFormOpen} onOpenChange={setIsRoleFormOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Role Type</DialogTitle>
            </DialogHeader>
            <RoleTypeForm onClose={() => setIsRoleFormOpen(false)} />
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={() => setIsRoleFormOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Role Type
        </Button>
        
        <Button className="w-full">
          + New Application
        </Button>
      </div>
    </div>
  );
} 