import { addToRoom, broadcastMessage } from "../rooms";

export function handleJoinRoom(ws: any, payload: any, user: any) {
  const incidentId = payload.incidentId;
  if (!incidentId) return;

  addToRoom(incidentId, ws);

  broadcastMessage(incidentId, "user-joined", {
    user: user.email
  });
}
