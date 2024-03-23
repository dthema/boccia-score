document.addEventListener('DOMContentLoaded', function () {
  let gamesList = document.getElementsByClassName('game-box')[0];
  let preloader = document.getElementsByClassName('preloader-games')[0];

  function fetchData() {
    preloader.style.display = 'block';

    fetch('https://dummyjson.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось получить ответ с сервера');
        }
        return response.json();
      })
      .then((data) => {
        let users = data.users;
        let randomizedUsers = users.sort(() => 0.5 - Math.random());
        let selectedUsers = randomizedUsers.slice(
          0,
          (Math.random() * 4 + 1) * 2,
        );
        updateContent(selectedUsers);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        preloader.style.display = 'none';
      });
  }

  function updateContent(data) {
    console.log(data);
    gamesList.innerHTML = '';

    if (data && Array.isArray(data)) {
      for (i = 0; i < data.length - 1; i += 2) {
        let playerRed = data[i];
        let playerBlue = data[i + 1];
        let gameItem = document.createElement('a');
        gameItem.classList.add(
          'content-box__item',
          'content-box__link',
          'content-box__item_shadowed',
          'game-box__item',
        );
        gameItem.href = '#';

        let playersDiv = document.createElement('div');
        playersDiv.classList.add('game-box__players');
        let playerRedSpan = document.createElement('span');
        playerRedSpan.classList.add(
          'game-box__players__player',
          'game-box__players__red',
        );
        playerRedSpan.textContent = getPlayerFullName(playerRed);
        let delimiterSpan = document.createElement('span');
        delimiterSpan.classList.add('game-box__players__delimiter');
        delimiterSpan.textContent = ' - ';
        let playerBlueSpan = document.createElement('span');
        playerBlueSpan.classList.add(
          'game-box__players__player',
          'game-box__players__blue',
        );
        playerBlueSpan.textContent = getPlayerFullName(playerBlue);
        playersDiv.appendChild(playerRedSpan);
        playersDiv.appendChild(delimiterSpan);
        playersDiv.appendChild(playerBlueSpan);

        let scoresDiv = document.createElement('div');
        scoresDiv.classList.add('game-box__scores');
        let scoreRedSpan = document.createElement('span');
        scoreRedSpan.classList.add(
          'game-box__scores__score',
          'game-box__scores__red',
        );
        scoreRedSpan.textContent = getPlayerScore(playerRed).toString();
        let delimiterScoreSpan = document.createElement('span');
        delimiterScoreSpan.classList.add('game-box__scores__delimiter');
        delimiterScoreSpan.textContent = ' : ';
        let scoreBlueSpan = document.createElement('span');
        scoreBlueSpan.classList.add(
          'game-box__scores__score',
          'game-box__scores__blue',
        );
        scoreBlueSpan.textContent = getPlayerScore(playerBlue).toString();
        scoresDiv.appendChild(scoreRedSpan);
        scoresDiv.appendChild(delimiterScoreSpan);
        scoresDiv.appendChild(scoreBlueSpan);

        let roundDiv = document.createElement('div');
        roundDiv.classList.add('game-box__round');
        roundDiv.textContent =
          parseInt((Math.random() * 4 + 1).toString()).toString() + ' энд';

        gameItem.appendChild(playersDiv);
        gameItem.appendChild(scoresDiv);
        gameItem.appendChild(roundDiv);

        gamesList.appendChild(gameItem);
      }
    } else {
      throw new Error('Нет данных о текущих играх');
    }
  }

  function handleError(error) {
    console.error(error);
    let errorItem = document.createElement('p');
    errorItem.textContent = error.message;
    gamesList.innerHTML = '';
    gamesList.appendChild(errorItem);
  }

  function getPlayerFullName(player) {
    return player.firstName + ' ' + player.lastName;
  }

  function getPlayerScore(player) {
    return parseInt((player.weight / (Math.random() * 10 + 10)).toString());
  }

  fetchData();
});
