import express from 'express';
import {Cell, Minesweeper, Position} from "./Minesweeper";
import {Player} from "../../src/object/Player";

// Server variables
const app = express();
const http = require("http").Server(app);
const Socketio = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const port = 4242;

//Minesweeper
let game: Minesweeper;
let players: Player[] = [];

Socketio.on("connection", function (socket: any) {
    Socketio.emit("playerUpdate", players);
    if (game && game.isRunning) socket.emit("grid", game);

    // On player disconnect
    socket.on("disconnect", () => {
        // Update mouses list and position
        removePlayer(socket.id);
        Socketio.emit("playerUpdate", players);
    });

    // On player join
    socket.on("join", (data: string) => {
        //Adding new player to instance
        let newPlayer: Player = {
            name: data,
            id: socket.id,
            isLog: true,
            color: getRandomColor(),
            score: Math.floor(Math.random() * 100),
            mousePosition: {
                x: 0,
                y: 0
            }
        };
        players.push(newPlayer);
        console.log('▲ ' + newPlayer.name + ' join the party !')
        socket.emit("joinSuccess", newPlayer);
    })

    // Start event
    socket.on("start", () => {
        game = new Minesweeper(25);
        Socketio.emit("grid", game);
    })

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

    // Track players data updates
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
})

function removePlayer(id: string) {
    players.forEach((item, index) => {
        if (item.id === id) {
            console.log('▼ Player ' + item.name + ' left the party =(');
            players.splice(index, 1);
        }
    });
}

const playerColorsList: string[] = [
    '#071A3C',
    '#F94144',
    '#F3722C',
    '#F8961E',
    '#F9844A',
    '#F9C74F',
    '#90BE6D',
    '#43AA8B',
    '#4D908E',
    '#577590',
    '#277DA1',
    '#b5e48c',
    '#76c893',
    '#001219',
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226',
    '#3c096c',
    '#5a189a',
    '#7b2cbf',
    '#9d4edd']

function getRandomColor() {
    return playerColorsList[Math.floor(Math.random() * playerColorsList.length)];
}


