import { RoomState, UserType } from "../types";
import { createWebSocket } from "../webSockets/createWebSocket";
import { User } from "./User";

export class Room implements RoomState {
    public roomId = Date.now()
    public roomUsers: UserType[] = [];

    public registerNewUser = (data: { name: string, password: number }) => {
        console.log(`new user ${data.name} is registered`)
        this.roomUsers.push(new User(data.name, data.password))
    }
}
