'use strict';

const SG = require('sentence-generator');
const sG = SG('./words.txt');

class Game {

  constructor(){
    this.text = this.generateString();
    this.player1 = null;
    this.player2 = null;
    this.winner = null;
    this.player3 = {name: 'Tie'};
  }

  generateString(){
    return sG.take(1);
  }

  calculateWinner(player1, player2){
    if((player1.wordsPerMinute - player1.incorrectEntries) > (player2.wordsPerMinute - player2.incorrectEntries)){
      return player1;
    } else if ((player2.wordsPerMinute - player2.incorrectEntries) > (player1.wordsPerMinute - player1.incorrectEntries)){
      return player2;
    } else {
      return this.player3;
    }
  }

}


module.exports = Game;




