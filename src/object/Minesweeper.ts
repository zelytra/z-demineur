export interface Minesweeper {
    grid: Cell[][]
}

export class Cell {

    public hasMine: boolean = false
    public isFlag: boolean = false
    public isHide: boolean = false

    getMineNumber(grid: Minesweeper): number {
        //TODO
        return 0;
    }
}