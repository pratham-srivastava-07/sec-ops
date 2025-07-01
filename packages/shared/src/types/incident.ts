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
