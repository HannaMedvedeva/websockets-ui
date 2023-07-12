import { ExpWebSocket, RoomState, UserType } from "../types"
import { createWebSocket } from "../webSockets/createWebSocket"
import { Room } from "./Room"

export class Game {
    public rooms: RoomState[] = []
    public users: UserType[] = []

    public startGame(gameId: number, userId: number) {
        console.log(createWebSocket.room.createGame(gameId, userId))
        return createWebSocket.room.createGame(gameId, userId)
    }

    public addUserToTheRoom(data: { indexRoom: number }, connections: ExpWebSocket[]) {

        const roomToUpdate = this.rooms.find(({ roomId }) => roomId === data.indexRoom)
        console.log('2', roomToUpdate)
        console.log('3', this.rooms)
        const gameId = roomToUpdate?.roomUsers[0].index

        gameId && connections.forEach((ws) => {
            ws.send(this.startGame(gameId, ws.id))
        })
    }

    public addUserToTheGame(name: string, index: number) {
        this.users.push({ name, index })
        const error = false
        const errorText = ''
        return createWebSocket.player.registerUser(name, index, error, errorText)
    }

    public updateRooms() {
        return createWebSocket.room.updateRoom(this.rooms.map(({ roomId, roomUsers }) => ({ roomId, roomUsers })))
    }

    public createRoom(wsId: number) {
        const currentUser = this.users.find(({ index }) => index === wsId)
        this.rooms.push(new Room(currentUser ? [currentUser] : []))

        return this.updateRooms()
    }
}
