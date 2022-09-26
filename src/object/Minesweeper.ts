export interface Minesweeper {
    grid?: Cell[][]

}

export interface Cell {

    hasMine: boolean,
    isFlag: boolean,
    isHide: boolean,
    bombArround: number,
    position: { x: number, y: number }

}