import { PrismaClient, Role, IncidentSeverity, IncidentStatus, IntegrationType } from '@prisma/client'
import {prismaClient} from ".."

import 'dotenv/config';

async function main() {
  // Create Users
  const admin = await prismaClient.user.create({
    data: {
      name: 'Alice Admin',
      email: 'admin@example.com',
      authId: 'auth0|admin123',
      role: Role.ADMIN,
      integrations: {
        create: {
          type: IntegrationType.SLACK,
          url: 'https://slack.com/webhook/admin',
          metadata: {
            channel: '#incidents',
          },
        },
      },
    },
  })

  const analyst = await prismaClient.user.create({
    data: {
      name: 'Bob Analyst',
      email: 'analyst@example.com',
      authId: 'auth0|analyst456',
      role: Role.ANALYST,
      integrations: {
        create: {
          type: IntegrationType.GITHUB,
          token: 'ghp_testtoken123',
          metadata: {
            repo: 'security/incident-reports',
          },
        },
      },
    },
  })

  // Create Incidents
  const incident1 = await prismaClient.incident.create({
    data: {
      title: 'Unauthorized Access Detected',
      description: 'Multiple failed login attempts from unknown IPs.',
      status: IncidentStatus.OPEN,
      severity: IncidentSeverity.HIGH,
      category: 'Security',
      source: 'SIEM',
      createdById: admin.id,
      assignedToId: analyst.id,
      affectedSystems: ['Login Service', 'Auth API'],
      isReportable: true,
      reportDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
      attachments: {
        screenshots: ['https://example.com/screenshot1.png'],
      },
    },
  })

  const incident2 = await prismaClient.incident.create({
    data: {
      title: 'Suspicious GitHub Activity',
      description: 'Unusual commit history observed in prod branch.',
      status: IncidentStatus.INVESTIGATING,
      severity: IncidentSeverity.MEDIUM,
      category: 'Codebase',
      source: 'GitHub',
      createdById: analyst.id,
      affectedSystems: ['GitHub Repo'],
      investigationNotes: 'Initial review suggests no harmful code.',
      isReportable: false,
    },
  })

  // Add Logs
  await prismaClient.incidentLog.createMany({
    data: [
      {
        incidentId: incident1.id,
        userEmail: admin.email,
        message: 'Initial report created.',
      },
      {
        incidentId: incident1.id,
        userEmail: analyst.email,
        message: 'Assigned for investigation.',
      },
      {
        incidentId: incident2.id,
        userEmail: analyst.email,
        message: 'Noticed commit spikes at midnight.',
      },
    ],
  })
}

main()
  .then(() => {
    console.log('Seeding successful.')
  })
  .catch((e) => {
    console.error('Error while seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })
