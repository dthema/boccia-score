document.addEventListener('DOMContentLoaded', function () {
  let currentPage = window.location.href;
  let menuLinks = document.querySelectorAll('.inline-menu__link');

  let startTime = performance.now();
  window.addEventListener('load', () => {
    let endTime = performance.now();
    let loadTime = endTime - startTime;

    let clientLoadSpan = document.querySelector('.page-load-info-client');
    clientLoadSpan.textContent = loadTime.toFixed(2);
  });

  menuLinks.forEach(function (link) {
    if (currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('current');
    }
  });

  let headroomScript = document.createElement('script');
  headroomScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/headroom.min.js';
  document.body.appendChild(headroomScript);
  headroomScript.onload = () => {
    let header = document.querySelector('header');
    const options = {
      offset: 0,
      tolerance: {
        up: 15,
        down: 0,
      },
      classes: {
        initial: 'headroom',
        pinned: 'headroom-pinned',
        unpinned: 'headroom-unpinned',
      },
    };
    let headroom = new Headroom(header, options);
    headroom.init();
  };

  let isListen = false;
  let annyangScript = document.createElement('script');
  annyangScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js';
  document.body.appendChild(annyangScript);

  annyangScript.onload = () => {
    let speechkittScript = document.createElement('script');
    speechkittScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/speechkitt.min.js';
    document.body.appendChild(speechkittScript);

    speechkittScript.onload = () => {
      initializeAnnyang();
    };
  };

  function initializeAnnyang() {
    if (annyang) {
      annyang.setLanguage('ru');

      annyang.addCommands({
        'открой главную': () => navigateTo('index.html'),
        'открой текущие игры': () => navigateTo('games.html'),
        'открой соревнования': () => navigateTo('competitions.html'),
        'открой рейтинг': () => navigateTo('ranking.html'),
      });

      SpeechKITT.annyang();
      SpeechKITT.setStylesheet(
        'https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css',
      );
      SpeechKITT.vroom();

      console.log('Annyang is ready!');
    } else {
      console.error('Annyang not available.');
    }
  }

  function navigateTo(url) {
    window.location.href = url;
  }

  function handleKeyPress(event) {
    if (event.key === 'L' || event.key === 'l') {
      if (isListen) {
        annyang.abort();
      } else {
        annyang.start();
      }
      isListen = !isListen;
    }
  }

  document.addEventListener('keydown', handleKeyPress);
});
