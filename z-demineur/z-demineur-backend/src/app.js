"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Minesweeper_1 = require("./Minesweeper");
// Server variables
const app = (0, express_1.default)();
const http = require("http").Server(app);
const Socketio = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const port = 8080;
http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//Minesweeper
let game;
let players = [];
Socketio.on("connection", function (socket) {
    Socketio.emit("playerUpdate", players);
    if (game && game.isRunning)
        socket.emit("grid", game);
    // On player disconnect
    socket.on("disconnect", () => {
        // Update mouses list and position
        removePlayer(socket.id);
        Socketio.emit("playerUpdate", players);
    });
    // On player join
    socket.on("join", (data) => {
        //Adding new player to instance
        let newPlayer = {
            name: data,
            id: socket.id,
            isLog: true,
            color: getRandomColor(),
            score: 0,
            mousePosition: {
                x: 0,
                y: 0
            }
        };
        players.push(newPlayer);
        console.log('▲ ' + newPlayer.name + ' join the party !');
        socket.emit("joinSuccess", newPlayer);
        Socketio.emit("playerUpdate", players);
        if (!game || !game.isRunning) {
            game = new Minesweeper_1.Minesweeper(25);
            Socketio.emit("grid", game);
        }
    });
    // Start event
    socket.on("start", () => {
        players.forEach(x => x.score = 0);
        game = new Minesweeper_1.Minesweeper(25);
        Socketio.emit("grid", game);
        Socketio.emit("playerUpdate", players);
    });
    // Set a flag on the cell
    socket.on("flag", (data) => {
        const cell = game.grid[data.x][data.y];
        if (cell.isHide) {
            cell.isFlag = !cell.isFlag;
        }
        Socketio.emit("grid", game);
    });
    // Reveal cell of minesweeper
    socket.on("reveal", (data) => {
        const cell = game.grid[data.position.x][data.position.y];
        const findPlayer = players.find(x => x.id == data.player.id);
        if (!findPlayer) {
            console.log("Player not found");
            return;
        }
        if (cell.isFlag)
            return;
        cell.reveal(game, findPlayer);
        game.grid.forEach(x => x.forEach(y => y.hasBeenCheckedByEmptyFinder = false));
        Socketio.emit("grid", game);
        Socketio.emit("playerUpdate", players);
    });
    // Track players data updates
    socket.on("playerUpdate", (player) => {
        players.forEach(x => {
            if (player.name == x.name) {
                x.mousePosition = player.mousePosition;
            }
        });
        Socketio.emit("playerUpdate", players);
    });
});
function removePlayer(id) {
    players.forEach((item, index) => {
        if (item.id === id) {
            console.log('▼ Player ' + item.name + ' left the party =(');
            players.splice(index, 1);
        }
    });
}
const playerColorsList = [
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
    '#9d4edd'
];
function getRandomColor() {
    return playerColorsList[Math.floor(Math.random() * playerColorsList.length)];
}
//# sourceMappingURL=app.js.map