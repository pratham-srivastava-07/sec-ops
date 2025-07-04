import { broadcastMessage } from "../rooms";

export function handleLogs(ws: any, payload: any, user: any) {
  const room = ws.room;
  if (!room) return;

  const log = {
    user: user.email,
    message: payload.message,
    timestamp: new Date().toISOString()
  };

  broadcastMessage(room, "log:new", log);
}
