import { routeMessage } from "./router";
import  verifyUser  from "./auth";
import { removeFromRoom, broadcastMessage } from "./rooms";

export function setUpWebsocket(wss: any) {
  wss.on("connection", (ws: any) => {
    console.log("Client connected");

    ws.on("message", async (data: any) => {
      try {
            const { event, payload, token } = JSON.parse(data);
            const user = await verifyUser(token);
            ws.user = user;

            await routeMessage(ws, { event, payload }, user);
        } catch (e: any) {
            ws.send(JSON.stringify({ event: "error", message: e.message }));
        }
    });

    ws.on("close", () => {
        const userEmail = ws.user?.email;
        const room = ws.room;

        removeFromRoom(ws);

        if (room) {
            broadcastMessage(room, "user-left", {
            user: userEmail
            });
        }

        console.log(`Disconnected: ${userEmail || "unknown"} from room ${room}`);
    });
  });
}
