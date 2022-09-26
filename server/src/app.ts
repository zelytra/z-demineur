import express from 'express';
import {Cell, Minesweeper, Position} from "./Minesweeper";

// Server variables
const app = express();
const http = require("http").Server(app);
const Socketio = require('socket.io')(http);
const port = 4242;

//Minesweeper
let grid: Minesweeper;

Socketio.on("connection", function (socket: any) {
    socket.on("flag", (data: Position) => {

        const cell: Cell = grid.grid[data.x][data.y];
        if (cell.isHide) {
            cell.isFlag = !cell.isFlag;
        }
        socket.emit("grid", grid);
    })

    socket.on("reveal", (data: Position) => {

        const cell: Cell = grid.grid[data.x][data.y];
        if (cell.isHide && !cell.isFlag) {
            cell.isHide = false;
        }
        socket.emit("grid", grid);
    })

    socket.emit("grid", grid);
});

Socketio.on("action", (data: Minesweeper) => {
    grid = data;

})

http.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    grid = new Minesweeper(25);
})

