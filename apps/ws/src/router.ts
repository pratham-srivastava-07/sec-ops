import { handleJoinRoom } from "./helper/handleJoin";
import { handleLogs } from "./helper/handleLogs";


export async function routeMessage(ws: any, msg: any, user: any) {
  const { event, payload } = msg;

  switch (event) {
    case "join-room":
      return handleJoinRoom(ws, payload, user);
    case "log:add":
      return handleLogs(ws, payload, user);
    default:
      ws.send(JSON.stringify({ event: "error", message: "Unknown event" }));
  }
}
