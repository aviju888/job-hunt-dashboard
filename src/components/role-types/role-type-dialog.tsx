"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleTypeForm } from "./role-type-form";
import { RoleType } from "@/types";

interface RoleTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: RoleType;
  title?: string;
}

export function RoleTypeDialog({
  open,
  onOpenChange,
  initialData,
  title = "Create Role Type",
}: RoleTypeDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Role Type" : title}</DialogTitle>
        </DialogHeader>
        <RoleTypeForm
          initialData={initialData}
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 