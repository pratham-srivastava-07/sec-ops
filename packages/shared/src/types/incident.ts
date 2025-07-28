import { z } from "zod";

// Updated schemas to match Prisma model structure
export const createIncidentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"]).optional(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  category: z.string().min(1),
  source: z.string().min(1),
  affectedSystems: z.array(z.string()).min(1),
  reportedIP: z.string().optional(),
  attachments: z.any().optional(),
  assignedToId: z.string().optional(), // Changed from assignedTo
  isReportable: z.boolean().optional(),
  notifiedAuthorities: z.boolean().optional(),
  createdById: z.string().min(1), // Changed from createdBy
  
  // Optional fields that exist in Prisma model
  investigationNotes: z.string().optional(),
  mitigationSteps: z.string().optional(),
  resolutionSummary: z.string().optional(),
  reportDeadline: z.coerce.date().optional(),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;

export const updateIncidentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"]).optional(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  category: z.string().optional(),
  source: z.string().optional(),
  createdById: z.string().optional(), // Changed from createdBy
  assignedToId: z.string().nullable().optional(), // Changed from assignedTo

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

export type UpdateIncident = z.infer<typeof updateIncidentSchema>;