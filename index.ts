import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import { MessageType, RoomState, UserType, WEbSocketRawData } from "./src/types.js";
import { createWebSocket } from "./src/webSockets/createWebSocket.js";
import { Room } from "./src/models/Room.js";
import { Game } from "./src/models/Game.js";

const HTTP_PORT = 8181;
const WS_PORT = 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });
const game = new Game()
const connections: WebSocket[] = []

wss.on("connection", function connection(ws) {

    connections.push(ws as unknown as WebSocket)

    const sendToAll = (webSocketMessage: string) => connections.forEach((ws: WebSocket) => ws.send(webSocketMessage))

    ws.on("message", function message(JSONdata) {
        const response = JSON.parse(JSONdata.toString())
        console.log('$', response)
        switch (response.type) {
            case MessageType.reg: return ws.send(game.addUserToTheGame(JSON.parse(response.data)))
            case MessageType.createRoom: return sendToAll(game.updateRooms())
        }
    });
});
