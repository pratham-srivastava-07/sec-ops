import { WebSocketServer } from 'ws';
import {supabase} from "@ops/shared"
import { setUpWebsocket } from './helper';

const wss = new WebSocketServer({ port: 4000 });

console.log("WebSocket server running on port 4000")

setUpWebsocket(wss);

