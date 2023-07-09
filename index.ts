import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer, WebSocket } from "ws";
import { ExpWebSocket, MessageType } from "./src/types.js";
import { Game } from "./src/models/Game.js";


const HTTP_PORT = 8181;
const WS_PORT = 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WS_PORT });
const game = new Game()
const connections: ExpWebSocket[] = []

wss.on("connection", function connection(ws: ExpWebSocket) {
    ws.id = Date.now()
    connections.push(ws as ExpWebSocket)

    const sendToAll = (webSocketMessage: string) => connections.forEach((ws: ExpWebSocket) => ws.send(webSocketMessage))

    sendToAll(game.updateRooms())

    ws.on("message", function message(JSONdata) {
        const response = JSON.parse(JSONdata.toString())
        console.log('$', response)
        switch (response.type) {
            case MessageType.reg: return ws.send(game.addUserToTheGame(JSON.parse(response.data).name, ws.id))
            case MessageType.createRoom: return sendToAll(game.createRoom(ws.id))
            case MessageType.addUserToRoom: return game.addUserToTheRoom(JSON.parse(response.data), connections)
        }
    });
});
