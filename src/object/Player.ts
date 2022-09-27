import {Position} from "../../server/src/Minesweeper";

export interface Player {
    name: string,
    mousePosition: Position,
    score: number,
    color: string,
    isLog: boolean,
    id: string
}