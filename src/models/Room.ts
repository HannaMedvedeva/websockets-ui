import { RoomState, UserType } from "../types";
import { User } from "./User";

export class Room implements RoomState {
    public roomId = Date.now()
    public roomUsers: UserType[] = [];

    constructor(users: UserType[] = []) {
        this.roomUsers = users
    }

    public registerNewUser = (data: UserType) => {
        console.log(`new user ${data.name} is registered`)
        this.roomUsers.push(new User(data.name, data.index))
    }
}
