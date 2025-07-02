import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"]),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  category: z.string().min(1),
  source: z.string().min(1),
  affectedSystems: z.array(z.string()).min(1),
  reportedIP: z.string().optional(),
  attachments: z.any().optional(),
  assignedTo: z.string().optional(),
  isReportable: z.boolean().optional(),
  notifiedAuthorities: z.boolean().optional(),
  createdBy: z.string().min(1),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;

export const updateIncidentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"]).optional(), // Changed IN_PROGRESS to INVESTIGATING
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  category: z.string().optional(),
  source: z.string().optional(),
  createdBy: z.string().optional(),
  assignedTo: z.string().nullable().optional(),

  investigationNotes: z.string().nullable().optional(),
  mitigationSteps: z.string().nullable().optional(),
  resolutionSummary: z.string().nullable().optional(),

  affectedSystems: z.array(z.string()).optional(),
  reportedIP: z.string().nullable().optional(),

  isReportable: z.boolean().optional(),
  reportDeadline: z.coerce.date().nullable().optional(),
  notifiedAuthorities: z.boolean().optional(),

  attachments: z.any().optional(),
});
export type UpdateIncident = z.infer<typeof updateIncidentSchema>