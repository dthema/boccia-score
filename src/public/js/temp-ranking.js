document.addEventListener('DOMContentLoaded', function () {
  const storageName = 'playersData';

  function createTable() {
    let rankingGrid = document.createElement('div');
    rankingGrid.classList.add('ranking-grid');

    let headerRow = document.createElement('div');
    headerRow.classList.add('ranking-grid__row', 'ranking-grid__row_header');
    let headers = ['№', 'ФИО', 'Очков', 'Регион'];

    headers.forEach(function (headerText) {
      let headerItem = document.createElement('span');
      headerItem.classList.add(
        'ranking-grid__item',
        'ranking-grid__item_' + headerText.toLowerCase(),
      );
      headerItem.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(headerItem);
    });

    rankingGrid.appendChild(headerRow);

    let storedData = JSON.parse(localStorage.getItem(storageName)) || [];

    storedData.forEach(function (playerData, index) {
      let dataRow = document.createElement('div');
      dataRow.classList.add('ranking-grid__row');

      let data = [
        index + 1,
        playerData.name,
        playerData.points,
        playerData.city,
      ];

      data.forEach(function (dataText, dataIndex) {
        let dataItem = document.createElement('span');
        dataItem.classList.add(
          'ranking-grid__item',
          'ranking-grid__item_' + headers[dataIndex].toLowerCase(),
        );
        dataItem.appendChild(document.createTextNode(dataText));
        dataRow.appendChild(dataItem);
      });

      rankingGrid.appendChild(dataRow);
    });

    let tableContainer = document.getElementsByClassName(
      'ranking-grid-container',
    )[0];
    tableContainer.innerHTML = '';
    tableContainer.appendChild(rankingGrid);
  }

  createTable();

  let addButton = document.getElementById('addPlayerButton');
  if (addButton) {
    addButton.addEventListener('click', function () {
      let playerName = document
        .getElementById('playerName')
        .value.toString()
        .trim();
      let playerCity = document
        .getElementById('playerCity')
        .value.toString()
        .trim();
      let playerPoints = parseInt(
        document.getElementById('playerPoints').value,
      );

      if (
        playerName.length > 0 &&
        playerCity.length > 0 &&
        !isNaN(playerPoints)
      ) {
        let currentData = localStorage.getItem(storageName);
        currentData = currentData ? JSON.parse(currentData) : [];
        currentData.push({
          name: playerName,
          points: playerPoints,
          city: playerCity,
        });
        currentData.sort(function (a, b) {
          return a.points > b.points ? -1 : 1;
        });
        localStorage.setItem(storageName, JSON.stringify(currentData));
        createTable();
      } else {
        alert('Пожалуйста, введите корректные данные.');
      }
    });
  }

  let removeButton = document.getElementById('removePlayerButton');
  if (removeButton) {
    removeButton.addEventListener('click', function () {
      let playerNumber = parseInt(
        document.getElementById('playerNumber').value,
      );

      if (!isNaN(playerNumber) && playerNumber > 0) {
        let storedData = JSON.parse(localStorage.getItem(storageName)) || [];
        if (playerNumber > storedData.length)
          alert('Пожалуйста, введите корректный номер игрока.');
        storedData.splice(playerNumber - 1, 1);
        localStorage.setItem(storageName, JSON.stringify(storedData));
        createTable();
      } else {
        alert('Пожалуйста, введите корректный номер игрока.');
      }
    });
  }
});
