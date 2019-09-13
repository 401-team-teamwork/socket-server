'use strict';

require('dotenv').config();

// 3rd Party Resources
const socketIoServer = require('socket.io')(process.env.PORT);
const Game = require('./src/gameModel');

//Sockets

let user1 = null;
let user2 = null;
let game = null;

socketIoServer.on('connection', socket => {
  console.log('Connected', socket.id);

  socket.on('new-player', player => {
    player.socket_id = socket.id;
    if (user1 !== null && user2 !== null) {
      socket.close();
    } else if (user1 === null) {
      user1 = player;
    } else {
      user2 = player;
    }

    socket.emit('log', player);

    if (user1 && user2) {
      //start the game
      game = new Game();

      socketIoServer.local.emit('new-game', game);
    }

    socket.on('player-finished', (player) => {
      if(game.player1 === null){
        game.player1 = player;
      } else if (game.player2 === null){
        game.player2 = player;
      }
      if (game.player1 !== null && game.player2 !== null) {
        game.winner = game.calculateWinner(game.player1, game.player2);
        chalk.bold(socketIoServer.local.emit('end-game', `\n\nAnd the winner is: ${game.winner.name}`));
        user1 = null;
        user2 = null;
      }
    });
  });

});


console.log(`Server is up on ${process.env.PORT}`)

