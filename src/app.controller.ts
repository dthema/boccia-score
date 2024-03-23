import { Controller, Get, Render } from '@nestjs/common';
import { GameService } from './games/game.service';
import { CompetitionService } from './competitions/competition.service';
import { AthleteService } from './athlete/athlete.service';

const sharedScripts = [{ jsPath: 'js/all-pages.js' }];

const headerMenuItems = [
  { text: 'Главная', link: 'index' },
  { text: 'Текущие игры', link: 'games' },
  { text: 'Соревнования', link: 'competitions' },
  { text: 'Рейтинг', link: 'ranking' },
];

const footerMenuItems = [
  { text: 'Главная', link: 'index' },
  { text: 'Панель администратора', link: 'login' },
];

const copyright = 'Беглецов Глеб © 2024';

@Controller()
export class AppController {
  constructor(
    private athleteService: AthleteService,
    private gameService: GameService,
    private competitionService: CompetitionService,
  ) {}

  @Get('index')
  @Render('index')
  async getIndex() {
    const styles = [{ cssPath: 'css/index.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      competitionsTitle: 'Недавние соревнования',
      competitionItems: this.competitionService.getMockCompetitions(),
      gamesTitle: 'Текущие игры',
      gameItems: await this.gameService.getMockGames(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('competitions')
  @Render('competitions')
  getCompetitions() {
    const styles = [{ cssPath: 'css/competitions.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      competitionsTitle: 'Прошедшие соревнования',
      competitionItems: this.competitionService.getMockCompetitions(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('games')
  @Render('games')
  async getGames() {
    const styles = [{ cssPath: 'css/games.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      gamesTitle: 'Текущие игры',
      showGamesFilter: true,
      gameItems: await this.gameService.getMockGames(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('ranking')
  @Render('ranking')
  async getRanking() {
    const styles = [{ cssPath: 'css/ranking.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      athletes: await this.athleteService.getMockAthletes(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('login')
  @Render('login')
  async getLogin() {
    const styles = [{ cssPath: 'css/ranking.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      athletes: await this.athleteService.getMockAthletes(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }
}
