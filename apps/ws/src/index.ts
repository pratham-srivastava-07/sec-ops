import { WebSocketServer } from 'ws';
import { setUpWebsocket } from './server';

const wss = new WebSocketServer({ port: 4000 });

console.log("WebSocket server running on port 4000")

setUpWebsocket(wss);

