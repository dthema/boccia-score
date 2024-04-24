import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { GameService } from './games/game.service';
import { CompetitionService } from './competitions/competition.service';
import { AthleteService } from './athlete/athlete.service';
import { LoaderInterceptor } from './loader.interceptor';
import { ApiExcludeController } from '@nestjs/swagger';

const sharedScripts = [{ jsPath: 'js/all-pages.js' }];

const headerMenuItems = [
  { text: 'Главная', link: 'index' },
  { text: 'Текущие игры', link: 'games' },
  { text: 'Соревнования', link: 'competitions' },
  { text: 'Рейтинг', link: 'ranking' },
];

const footerMenuItems = [
  { text: 'Главная', link: 'index' },
  { text: 'Текущие игры', link: 'games' },
  { text: 'Соревнования', link: 'competitions' },
  { text: 'Рейтинг', link: 'ranking' },
];

const copyright = 'Беглецов Глеб © 2024';

@Controller()
@UseInterceptors(LoaderInterceptor)
@ApiExcludeController()
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
      competitionItems: await this.competitionService.getAll(),
      gamesTitle: 'Текущие игры',
      gameItems: await this.gameService.getAll(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('competitions')
  @Render('competitions')
  async getCompetitions() {
    const styles = [{ cssPath: 'css/competitions.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      competitionsTitle: 'Прошедшие соревнования',
      competitionItems: await this.competitionService.getAll(),
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
      gameItems: await this.gameService.getAll(),
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
      athletes: await this.athleteService.getAll(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }
}
