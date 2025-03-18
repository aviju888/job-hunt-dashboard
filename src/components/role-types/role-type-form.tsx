"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RoleType } from "@/types";
import { useRoleTypes } from "@/context";

const roleTypeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  industry: z.string().min(1, "Industry is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof roleTypeSchema>;

interface RoleTypeFormProps {
  initialData?: RoleType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RoleTypeForm({ initialData, onSuccess, onCancel }: RoleTypeFormProps) {
  const { addRoleType, updateRoleType } = useRoleTypes();
  const [requiredSkills, setRequiredSkills] = useState<string[]>(initialData?.requiredSkills || []);
  const [preferredSkills, setPreferredSkills] = useState<string[]>(initialData?.preferredSkills || []);
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  const [newPreferredSkill, setNewPreferredSkill] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(roleTypeSchema),
    defaultValues: {
      title: initialData?.title || "",
      industry: initialData?.industry || "",
      description: initialData?.description || "",
    },
  });

  const addRequiredSkill = () => {
    if (newRequiredSkill.trim() && !requiredSkills.includes(newRequiredSkill.trim())) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]);
      setNewRequiredSkill("");
    }
  };

  const removeRequiredSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  const addPreferredSkill = () => {
    if (newPreferredSkill.trim() && !preferredSkills.includes(newPreferredSkill.trim())) {
      setPreferredSkills([...preferredSkills, newPreferredSkill.trim()]);
      setNewPreferredSkill("");
    }
  };

  const removePreferredSkill = (skill: string) => {
    setPreferredSkills(preferredSkills.filter((s) => s !== skill));
  };

  const onSubmit = (values: FormValues) => {
    const roleTypeData = {
      ...values,
      requiredSkills,
      preferredSkills,
      salaryRange: initialData?.salaryRange || { min: 0, max: 0, currency: "USD" },
      targetCompanies: initialData?.targetCompanies || [],
      jobBoards: initialData?.jobBoards || [],
      searchKeywords: initialData?.searchKeywords || [],
      associatedResumes: initialData?.associatedResumes || [],
    };

    if (initialData) {
      updateRoleType(initialData.id, roleTypeData);
    } else {
      addRoleType(roleTypeData);
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the role type..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div>
            <FormLabel>Required Skills</FormLabel>
            <div className="flex mt-2 mb-2">
              <Input
                placeholder="Add a required skill"
                value={newRequiredSkill}
                onChange={(e) => setNewRequiredSkill(e.target.value)}
                className="flex-1 mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRequiredSkill();
                  }
                }}
              />
              <Button type="button" onClick={addRequiredSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                  <X
                    className="ml-2 h-3 w-3 cursor-pointer"
                    onClick={() => removeRequiredSkill(skill)}
                  />
                </Badge>
              ))}
              {requiredSkills.length === 0 && (
                <p className="text-sm text-muted-foreground">No required skills added</p>
              )}
            </div>
          </div>

          <div>
            <FormLabel>Preferred Skills</FormLabel>
            <div className="flex mt-2 mb-2">
              <Input
                placeholder="Add a preferred skill"
                value={newPreferredSkill}
                onChange={(e) => setNewPreferredSkill(e.target.value)}
                className="flex-1 mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addPreferredSkill();
                  }
                }}
              />
              <Button type="button" onClick={addPreferredSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferredSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                  <X
                    className="ml-2 h-3 w-3 cursor-pointer"
                    onClick={() => removePreferredSkill(skill)}
                  />
                </Badge>
              ))}
              {preferredSkills.length === 0 && (
                <p className="text-sm text-muted-foreground">No preferred skills added</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {initialData ? "Update Role Type" : "Create Role Type"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 