"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  GraduationCap,
  Users,
  PlusCircle,
} from "lucide-react";
import { RoleTypeDialog } from "@/components/role-types/role-type-dialog";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/applications",
    icon: Briefcase,
  },
  {
    title: "Experience",
    href: "/experience",
    icon: GraduationCap,
  },
  {
    title: "Resume",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "Networking",
    href: "/networking",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Job Hunt Dashboard
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Actions
          </h2>
          <div className="space-y-1">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsRoleFormOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Role Type
            </Button>
            <Link href="/applications/new">
              <Button variant="outline" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <RoleTypeDialog 
        open={isRoleFormOpen} 
        onOpenChange={setIsRoleFormOpen} 
      />
    </div>
  );
} 