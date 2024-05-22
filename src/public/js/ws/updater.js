const socket = io('/');

socket.on('update', function (game) {
  const gameItem = document.getElementById('game-' + game.id);

  if (gameItem) {
    if (game.status === 'FINISHED') {
      gameItem.remove();
    } else {
      const redScoreElement = gameItem.querySelector('.game-box__scores__red');
      const blueScoreElement = gameItem.querySelector('.game-box__scores__blue');
      const roundElement = gameItem.querySelector('.game-box__round__number');

      redScoreElement.textContent = game.redScore;
      blueScoreElement.textContent = game.blueScore;
      roundElement.textContent = game.round;
    }
  }
});
