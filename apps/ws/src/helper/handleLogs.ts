import { broadcastMessage } from "../rooms";

import { prismaClient } from "@ops/shared";

export async function handleLogs(ws: any, payload: any, user: any) {
  const incidentId = ws.room;
  if (!incidentId) return;

  const log = await prismaClient.incidentLog.create({
    data: {
      incidentId,
      userEmail: user.email,
      message: payload.message
    }
  });

  broadcastMessage(incidentId, "log:new", {
    user: log.userEmail,
    message: log.message,
    timestamp: log.createdAt
  });
}