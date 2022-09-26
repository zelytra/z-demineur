import express from 'express';
import {Cell, Minesweeper, Position} from "./Minesweeper";
import {Player} from "../../src/object/Player";

// Server variables
const app = express();
const http = require("http").Server(app);
const Socketio = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});
const port = 4242;

//Minesweeper
let game: Minesweeper;
let players: Player[] = [];

Socketio.on("connection", function (socket: any) {
    socket.emit("grid", game);

    //Adding new player to instance
    let newPlayer: Player = {
        name: socket.id,
        mousePosition: {
            x: 0,
            y: 0
        }
    }
    players.push(newPlayer);
    socket.emit("joinSucess", newPlayer);
    console.log('▲ Player ' + socket.id + ' join the party !')

    // On player disconnect
    socket.on("disconnect", () => {
        // Update mouses list and position
        removePlayer(socket);
        Socketio.emit("playerUpdate", players);
        console.log('▼ Player ' + socket.id + ' left the party =(')
    });

    // Set a flag on the cell
    socket.on("flag", (data: Position) => {
        const cell: Cell = game.grid[data.x][data.y];
        if (cell.isHide) {
            cell.isFlag = !cell.isFlag;
        }
        Socketio.emit("grid", game);
    })

    // Reveal cell of minesweeper
    socket.on("reveal", (data: Position) => {

        const cell: Cell = game.grid[data.x][data.y];
        cell.reveal(game.grid);
        game.grid.forEach(x => x.forEach(y => y.hasBeenCheckedByEmptyFinder = false))
        Socketio.emit("grid", game);
    })

    // Track players mouses
    socket.on("playerUpdate", (player: Player) => {
        players.forEach(x => {
            if (player.name == x.name) {
                x.mousePosition = player.mousePosition;
            }
        })
        Socketio.emit("playerUpdate", players);
    });


});

http.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    game = new Minesweeper(25);
})

function removePlayer(name: string) {

    players.forEach((item, index) => {
        if (item.name === name) players.splice(index, 1);
    });
}

