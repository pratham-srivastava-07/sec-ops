/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `incidents` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `incidents` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `incidents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('SLACK', 'DISCORD', 'GITHUB', 'JIRA', 'CUSTOM_WEBHOOK');

-- AlterTable
ALTER TABLE "incidents" DROP COLUMN "assignedTo",
DROP COLUMN "createdBy",
ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "type" "IntegrationType" NOT NULL,
    "url" TEXT,
    "token" TEXT,
    "metadata" JSONB,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
