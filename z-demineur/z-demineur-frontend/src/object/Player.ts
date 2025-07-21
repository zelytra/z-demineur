import {Position} from "./Minesweeper";

export interface Player {
    name: string,
    mousePosition: Position,
    score: number,
    color: string,
    isLog: boolean,
    id: string
}