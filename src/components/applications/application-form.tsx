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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleTypes, useResumes, useApplications } from "@/context";
import { Application, ApplicationStatus, RemoteType } from "@/types";

// Schema for form validation
const applicationSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  remote: z.enum(["onsite", "hybrid", "remote"] as const),
  postingUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  dateIdentified: z.string(),
  dateApplied: z.string().optional(),
  status: z.enum([
    "interested", 
    "applied", 
    "phone_screen", 
    "interview", 
    "technical_assessment",
    "offer", 
    "negotiation",
    "accepted",
    "rejected",
    "withdrawn"
  ] as const),
  resumeUsed: z.string(),
  roleType: z.string(),
  notes: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  initialData?: Application;
  onClose: () => void;
}

export function ApplicationForm({ initialData, onClose }: ApplicationFormProps) {
  const { roleTypes } = useRoleTypes();
  const { resumes } = useResumes();
  const { addApplication, updateApplication } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default values
  const defaultValues: Partial<ApplicationFormValues> = initialData ? {
    company: initialData.company,
    position: initialData.position,
    location: initialData.location,
    remote: initialData.remote,
    postingUrl: initialData.postingUrl || '',
    dateIdentified: initialData.dateIdentified,
    dateApplied: initialData.dateApplied || '',
    status: initialData.status,
    resumeUsed: initialData.resumeUsed,
    roleType: initialData.roleType,
    notes: initialData.notes,
  } : {
    company: '',
    position: '',
    location: '',
    remote: 'onsite' as RemoteType,
    postingUrl: '',
    dateIdentified: new Date().toISOString().split('T')[0],
    dateApplied: '',
    status: 'interested' as ApplicationStatus,
    resumeUsed: resumes.length > 0 ? resumes[0].id : '',
    roleType: roleTypes.length > 0 ? roleTypes[0].id : '',
    notes: '',
  };

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
  });

  // Form submit handler
  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    
    try {
      if (initialData) {
        // Update existing application
        updateApplication(initialData.id, {
          ...data,
          interviews: initialData.interviews || [],
          tasks: initialData.tasks || [],
          contacts: initialData.contacts || [],
        });
      } else {
        // Add new application
        addApplication({
          ...data,
          interviews: [],
          tasks: [],
          contacts: [],
        });
      }
      
      onClose();
    } catch (error) {
      console.error("Error saving application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remote Type */}
          <FormField
            control={form.control}
            name="remote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Identified */}
          <FormField
            control={form.control}
            name="dateIdentified"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Found</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Applied */}
          <FormField
            control={form.control}
            name="dateApplied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Applied</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="phone_screen">Phone Screen</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="technical_assessment">Technical Assessment</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Type */}
          <FormField
            control={form.control}
            name="roleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={roleTypes.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={roleTypes.length ? "Select role type" : "No role types available"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleTypes.map(roleType => (
                      <SelectItem key={roleType.id} value={roleType.id}>
                        {roleType.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume Used */}
          <FormField
            control={form.control}
            name="resumeUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Used</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={resumes.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={resumes.length ? "Select resume" : "No resumes available"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resumes.map(resume => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Posting URL */}
          <FormField
            control={form.control}
            name="postingUrl"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Job Posting URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Additional notes..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Add Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 