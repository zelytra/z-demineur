"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.Minesweeper = void 0;
class Minesweeper {
    grid;
    isRunning = false;
    gameIsLose = false;
    bombLuck = 15;
    constructor(size) {
        this.grid = [];
        for (let x = 0; x <= size; x++) {
            this.grid[x] = [];
            for (let y = 0; y <= size; y++) {
                let cell = new Cell(false, x, y);
                //Refaire l'algo avec x et y random plutot
                if (this.randomIntFromInterval(0, 100) <= this.bombLuck)
                    cell = new Cell(true, x, y);
                this.grid[x][y] = cell;
            }
        }
        this.grid.forEach(x => x.forEach(y => y.initBombAmount(this.grid)));
        this.isRunning = true;
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.Minesweeper = Minesweeper;
class Cell {
    hasMine = false;
    isFlag = false;
    isHide = true;
    position;
    bombAround = 0;
    hasBeenCheckedByEmptyFinder = false;
    constructor(mine, x, y) {
        this.hasMine = mine;
        this.position = { x: x, y: y };
    }
    initBombAmount(grid) {
        for (let x = Math.max(0, this.position.x - 1); x <= Math.min(grid.length - 1, this.position.x + 1); x++) {
            for (let y = Math.max(0, this.position.y - 1); y <= Math.min(this.position.y + 1, grid.length - 1); y++) {
                if (grid[x][y] && grid[x][y].hasMine)
                    this.bombAround++;
            }
        }
    }
    reveal(game, player) {
        if (!this.isHide)
            return;
        this.isHide = false;
        if (this.hasMine) {
            game.gameIsLose = true;
            player.score = 0;
            game.grid.forEach(x => x.forEach(y => y.isHide = false));
            return;
        }
        if (this.bombAround == 0) {
            this.recursiveEmptyCellChecker(game);
            return;
        }
        player.score += 5;
    }
    autoReveal(game) {
        if (!this.isHide)
            return;
        this.isHide = false;
        if (this.bombAround == 0) {
            this.recursiveEmptyCellChecker(game);
            return;
        }
    }
    recursiveEmptyCellChecker(game) {
        for (let x = Math.max(0, this.position.x - 1); x <= Math.min(game.grid.length - 1, this.position.x + 1); x++) {
            for (let y = Math.max(0, this.position.y - 1); y <= Math.min(this.position.y + 1, game.grid.length - 1); y++) {
                let cell = game.grid[x][y];
                if (cell.hasBeenCheckedByEmptyFinder)
                    break;
                if (cell && !cell.hasMine) { //Wall stopper
                    cell.autoReveal(game);
                }
            }
        }
        this.hasBeenCheckedByEmptyFinder = true;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Minesweeper.js.map