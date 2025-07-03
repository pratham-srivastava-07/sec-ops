// import {Websocket} from "ws"
import { prismaClient } from "@ops/shared";

export function setUpWebsocket(wss: any) {
    wss.on('connection', (ws: any) => {
        console.log("Client connected")
    })
}