'use strict';

const Game = require('../src/gameModel');

describe('Test the game model',  () => {

  let game = new Game();

  it('can instantiate a new game', () => {
    let testGame = new Game();
    expect(testGame.text).toBeTruthy();
  });

  it('can generate a new text string.', () => {
    let initialText = game.text;
    game.text = game.generateString();
    function status(){
      return (initialText === game.text);
    }
    expect(status()).toBe(false);
  });

  it('ccan calculate a winner', () => {
    let player1 = {
      name: 'Frank',
      wordsPerMinute: 58,
      incorrectEntries: 4,
    };
    let player2 = {
      name: 'Pancakes',
      wordsPerMinute: 70,
      incorrectEntries: 4,
    };
    game.winner = game.calculateWinner(player1, player2);
    expect(game.winner.name).toBe('Pancakes');
  });

});
