// controllers/dashboard.ts
import { prismaClient } from "@ops/shared";

export async function getSummaryController(req: any, res: any): Promise<any> {
  try {
    const [
      total,
      open,
      investigating,
      resolved,
      closed,
      critical,
      high,
      medium,
      low,
    ] = await Promise.all([
      prismaClient.incident.count(),
      prismaClient.incident.count({ where: { status: "OPEN" } }),
      prismaClient.incident.count({ where: { status: "INVESTIGATING" } }),
      prismaClient.incident.count({ where: { status: "RESOLVED" } }),
      prismaClient.incident.count({ where: { status: "CLOSED" } }),

      prismaClient.incident.count({ where: { severity: "CRITICAL" } }),
      prismaClient.incident.count({ where: { severity: "HIGH" } }),
      prismaClient.incident.count({ where: { severity: "MEDIUM" } }),
      prismaClient.incident.count({ where: { severity: "LOW" } }),
    ]);

    return res.status(200).json({
      message: "Summary fetched",
      result: {
        total,
        byStatus: { open, investigating, resolved, closed },
        bySeverity: { critical, high, medium, low },
      },
    });
  } catch (error) {
    console.error("Error in getSummaryController", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
