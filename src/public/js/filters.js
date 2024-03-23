function filterGames() {
  let input, filter, gameBox, gameItems, playerNames, i, txtValue;
  input = document.getElementById('playerFilter');
  filter = input.value.toLowerCase();
  gameBox = document.getElementById('gameList');
  gameItems = gameBox.getElementsByClassName('game-box__item');

  for (i = 0; i < gameItems.length; i++) {
    playerNames = gameItems[i].getElementsByClassName(
      'game-box__players__player',
    );
    for (j = 0; j < playerNames.length; j++) {
      let playerName = playerNames[j].textContent || playerNames[j].innerText;
      if (playerName.toLowerCase().includes(filter)) {
        gameItems[i].style.display = '';
        break;
      } else {
        gameItems[i].style.display = 'none';
      }
    }
  }
}

function filterCompetitions() {
  let filterName = document
    .getElementById('competitionFilterName')
    .value.toLowerCase();
  let filterStatus = document
    .getElementById('competitionFilterStatus')
    .value.toLowerCase();
  let filterDate = document
    .getElementById('competitionFilterDate')
    .value.toLowerCase();
  let competitions = document.querySelectorAll('.competition-box__item');

  competitions.forEach(function (competition) {
    let name = competition
      .querySelector('.competition-box__name')
      .textContent.toLowerCase();
    let status = competition
      .querySelector('.competition-box__status')
      .textContent.toLowerCase();
    let date = competition
      .querySelector('.competition-box__date')
      .textContent.toLowerCase();

    if (
      name.includes(filterName) &&
      status.includes(filterStatus) &&
      date.includes(filterDate)
    ) {
      competition.style.display = 'block'; // Отображаем совпадающие элементы
    } else {
      competition.style.display = 'none'; // Скрываем несовпадающие элементы
    }
  });
}
