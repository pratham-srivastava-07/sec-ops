-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('OPEN', 'INVESTIGATING', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "IncidentSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'OPEN',
    "severity" "IncidentSeverity" NOT NULL,
    "category" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "assignedTo" TEXT,
    "investigationNotes" TEXT,
    "mitigationSteps" TEXT,
    "resolutionSummary" TEXT,
    "affectedSystems" TEXT[],
    "reportedIP" TEXT,
    "isReportable" BOOLEAN NOT NULL DEFAULT false,
    "reportDeadline" TIMESTAMP(3),
    "notifiedAuthorities" BOOLEAN NOT NULL DEFAULT false,
    "attachments" JSONB,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);
