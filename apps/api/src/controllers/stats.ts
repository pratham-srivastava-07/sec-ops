import { prismaClient } from "@ops/shared";

export default async function statsController(req: any, res: any): Promise<any> {
    try {
    const [total, openCount, closedCount] = await Promise.all([
      prismaClient.incident.count(),
      prismaClient.incident.count({ where: { status: "OPEN" } }),
      prismaClient.incident.count({ where: { status: "CLOSED" } }),
    ]);

    return res.status(200).json({
      total,
      open: openCount,
      closed: closedCount,
      by: ['status'],
     _count: true
    });
  } catch (error: any) {
    console.error("Error fetching incident stats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}