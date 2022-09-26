import {Mouse} from "./Mouse";
import {Position} from "../../server/src/Minesweeper";

export interface Player {
    name: string,
    mousePosition: Position,
    score?: number
}