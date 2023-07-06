import { RoomState, UserType } from "../types"
import { createWebSocket } from "../webSockets/createWebSocket"
import { Room } from "./Room"

export class Game {
    public rooms: RoomState[] = [new Room()]
    public users: UserType[] = []

    public addUserToTheRoom(user: { name: string, password: number }) {
        const lastRoom = this.rooms[this.rooms.length - 1]
        if (lastRoom.roomUsers.length < 2) {
            return lastRoom.registerNewUser(user)
        } else {
            const newRoom = new Room()
            this.rooms.push(newRoom)
            return newRoom.registerNewUser(user)
        }
    }

    public addUserToTheGame(user: { name: string, password: number }) {
        this.users.push({ name: user.name, index: user.password })
        const error = false
        const errorText = ''
        return createWebSocket.player.registerUser(user.name, user.password, error, errorText)
    }

    public updateRooms() {
        return createWebSocket.room.updateRoom(this.rooms.map(({ roomId, roomUsers }) => ({ roomId, roomUsers })))
    }
}
