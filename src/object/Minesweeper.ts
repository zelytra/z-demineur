export interface Minesweeper {
    grid: Cell[][],
    isRunning: boolean
    gameIsLose: boolean
}

export interface Cell {

    hasMine: boolean,
    isFlag: boolean,
    isHide: boolean,
    bombAround: number,
    position: { x: number, y: number }

}