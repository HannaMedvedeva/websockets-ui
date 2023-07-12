import { WebSocket } from "ws";

export interface Position {
    x: number,
    y: number,
}

export type ShipSize = "small" | "medium" | "large" | "huge"

export interface ShipState {
    position: Position,
    direction: boolean,
    length: number,
    type: ShipSize,
}

export type HitStatus = "miss" | "killed" | "shot"

export interface UserType {
    name: string,
    index: number,
}

export interface RoomState {
    roomId: number,
    roomUsers: UserType[],
    registerNewUser: (user: UserType) => void,
}

export enum MessageType {
    reg = 'reg',
    updateWinners = 'update_winners',
    createRoom = 'create_room',
    addUserToRoom = 'add_user_to_room',
    createGame = 'create_game',
    updateRoom = 'update_room',
    addShips = 'add_ships',
    startGame = 'start_game',
    attack = 'attack',
    randomAttack = 'randomAttack',
    turn = 'turn',
    finish = 'finish',
}

export interface WEbSocketRawData {
    type: MessageType,
    data: any,
    id: number,
}


export interface ExpWebSocket extends WebSocket {
    id: number,
    user: UserType[]
}
