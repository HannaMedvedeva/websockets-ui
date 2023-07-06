import { HitStatus, MessageType, Position, RoomState, ShipState, UserType } from "../types";

export const createWebSocket = {
    player: {
        registerUser: (name: string, index: number, error: boolean, errorText: string) => JSON.stringify({
            type: MessageType.reg,
            data: JSON.stringify({ name, index, error, errorText }),
            id: 0,
        }),
        updateWinners: (name: string, wins: number) => JSON.stringify({
            type: MessageType.updateWinners,
            data:
                [
                    {
                        name,
                        wins,
                    }
                ],
            id: 0,
        })
    },
    room: {
        createGame: (idGame: number, idPlayer: number) => JSON.stringify({
            type: MessageType.createGame,
            data:
            {
                idGame,
                idPlayer,
            },
            id: 0,
        }),
        updateRoom: (rooms: Array<{ roomId: number, roomUsers: UserType[] }>) => JSON.stringify({
            type: MessageType.updateRoom,
            data: JSON.stringify(rooms),
            id: 0,
        }),
    },
    ships: {
        startGame: (ships: ShipState[], currentPlayerIndex: number) => JSON.stringify({
            type: MessageType.startGame,
            data:
            {
                ships,
                currentPlayerIndex,
            },
            id: 0,
        }),
        attack: (position: Position, currentPlayer: number, status: HitStatus) => JSON.stringify({
            type: MessageType.attack,
            data:
            {
                position,
                currentPlayer,
                status,
            },
            id: 0,
        }),
        turn: (currentPlayer: number) => JSON.stringify({
            type: MessageType.turn,
            data:
            {
                currentPlayer,
            },
            id: 0,
        }),
        finishGame: (winPlayer: number) => JSON.stringify({
            type: MessageType.finish,
            data:
            {
                winPlayer,
            },
            id: 0,
        })
    }
}
