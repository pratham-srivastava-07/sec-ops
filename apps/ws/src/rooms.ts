const rooms = new Map<string, Set<any>>();

export function addToRoom(roomId: string, ws: any) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId)!.add(ws);
  ws.room = roomId;
}

export function removeFromRoom(ws: any) {
  const room = ws.room;
  if (!room || !rooms.has(room)) return;

  rooms.get(room)!.delete(ws);
  if (rooms.get(room)!.size === 0) rooms.delete(room);
}

export function broadcastMessage(roomId: string, event: string, payload: any) {
  const clients = rooms.get(roomId);
  if (!clients) return;

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ event, payload }));
    }
  }
}
