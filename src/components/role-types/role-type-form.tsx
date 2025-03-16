import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRoleTypes } from "@/context";
import { RoleType } from "@/types";

// Schema for form validation
const roleTypeSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  description: z.string().optional(),
  newSkill: z.string().optional(),
});

interface RoleTypeFormProps {
  initialData?: RoleType;
  onClose: () => void;
}

export function RoleTypeForm({ initialData, onClose }: RoleTypeFormProps) {
  const { addRoleType, updateRoleType } = useRoleTypes();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiredSkills, setRequiredSkills] = useState<string[]>(
    initialData?.requiredSkills || []
  );
  const [preferredSkills, setPreferredSkills] = useState<string[]>(
    initialData?.preferredSkills || []
  );

  // Set default values
  const defaultValues = {
    title: initialData?.title || "",
    industry: initialData?.industry || "",
    description: initialData?.description || "",
    newSkill: "",
  };

  const form = useForm<z.infer<typeof roleTypeSchema>>({
    resolver: zodResolver(roleTypeSchema),
    defaultValues,
  });

  // Add a skill to the required skills list
  const addRequiredSkill = () => {
    const newSkill = form.getValues("newSkill");
    if (newSkill && !requiredSkills.includes(newSkill)) {
      setRequiredSkills([...requiredSkills, newSkill]);
      form.setValue("newSkill", "");
    }
  };

  // Add a skill to the preferred skills list
  const addPreferredSkill = () => {
    const newSkill = form.getValues("newSkill");
    if (newSkill && !preferredSkills.includes(newSkill)) {
      setPreferredSkills([...preferredSkills, newSkill]);
      form.setValue("newSkill", "");
    }
  };

  // Remove a skill from the required skills list
  const removeRequiredSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  // Remove a skill from the preferred skills list
  const removePreferredSkill = (skill: string) => {
    setPreferredSkills(preferredSkills.filter((s) => s !== skill));
  };

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof roleTypeSchema>) => {
    setIsSubmitting(true);
    
    try {
      const roleTypeData = {
        title: data.title,
        industry: data.industry,
        description: data.description,
        requiredSkills,
        preferredSkills,
        salaryRange: initialData?.salaryRange || {
          min: 0,
          max: 0,
          currency: "USD",
        },
        targetCompanies: initialData?.targetCompanies || [],
        jobBoards: initialData?.jobBoards || [],
        searchKeywords: initialData?.searchKeywords || [],
        associatedResumes: initialData?.associatedResumes || [],
        notes: initialData?.notes || "",
      };

      if (initialData) {
        // Update existing role type
        updateRoleType(initialData.id, roleTypeData);
      } else {
        // Add new role type
        addRoleType(roleTypeData);
      }
      
      onClose();
    } catch (error) {
      console.error("Error saving role type:", error);
    } finally {
      setIsSubmitting(false);
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
              <FormLabel>Role Title</FormLabel>
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
                <Input placeholder="Brief description of the role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Skills</FormLabel>
          <div className="flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="newSkill"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Add a skill" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" onClick={addRequiredSkill}>
              + Required
            </Button>
            <Button type="button" variant="outline" onClick={addPreferredSkill}>
              + Preferred
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground">No required skills added</p>
              ) : (
                requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeRequiredSkill(skill)}>
                    {skill} ×
                  </Badge>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Preferred Skills</h4>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.length === 0 ? (
                <p className="text-sm text-muted-foreground">No preferred skills added</p>
              ) : (
                preferredSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="cursor-pointer" onClick={() => removePreferredSkill(skill)}>
                    {skill} ×
                  </Badge>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Role" : "Add Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 