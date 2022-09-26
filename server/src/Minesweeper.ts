export class Minesweeper {
    public grid: Cell[][];

    private bombLuck: number = 15;

    constructor(size: number) {
        this.grid = [];
        for (let x = 0; x <= size; x++) {
            this.grid[x] = [];
            for (let y = 0; y <= size; y++) {
                let cell: Cell = new Cell(false, x, y);
                //Refaire l'algo avec x et y random plutot
                if (this.randomIntFromInterval(0, 100) <= this.bombLuck) cell = new Cell(true, x, y);
                this.grid[x][y] = cell;
            }
        }
        this.grid.forEach(x => x.forEach(y => y.initBombAmount(this.grid)))

    }

    randomIntFromInterval(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

}

export class Cell {

    public hasMine: boolean = false
    public isFlag: boolean = false
    public isHide: boolean = true
    public position: Position;
    public bombArround: number = 0;

    public hasBeenCheckedByEmptyFinder: boolean = false;

    constructor(mine: boolean, x: number, y: number) {
        this.hasMine = mine;
        this.position = {x: x, y: y};
    }

    initBombAmount(grid: Cell[][]) {
        for (let x = Math.max(0, this.position.x - 1); x <= Math.min(grid.length - 1, this.position.x + 1); x++) {
            for (let y = Math.max(0, this.position.y - 1); y <= Math.min(this.position.y + 1, grid.length - 1); y++) {
                if (grid[x][y] && grid[x][y].hasMine) this.bombArround++;
            }
        }
    }

    reveal(grid: Cell[][]) {
        if (this.hasMine) {
            //TODO defeat listener
            //return;
        }

        if (!this.isHide) return;
        this.isHide = false;

        if (this.bombArround == 0) {
            this.recursiveEmptyCellChecker(grid);
        }

    }

    recursiveEmptyCellChecker(grid: Cell[][]) {

        for (let x = Math.max(0, this.position.x - 1); x <= Math.min(grid.length - 1, this.position.x + 1); x++) {
            for (let y = Math.max(0, this.position.y - 1); y <= Math.min(this.position.y + 1, grid.length - 1); y++) {
                let cell: Cell = grid[x][y];
                if (cell.hasBeenCheckedByEmptyFinder) break;
                if (cell && !cell.hasMine) { //Wall stopper
                    cell.reveal(grid);
                }
            }
        }
        this.hasBeenCheckedByEmptyFinder = true;
    }
}

export interface Position {
    x: number,
    y: number
}