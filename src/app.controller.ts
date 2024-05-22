import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { GameService } from './games/game.service';
import { CompetitionService } from './competitions/competition.service';
import { AthleteService } from './athlete/athlete.service';
import { LoaderInterceptor } from './loader.interceptor';
import { ApiExcludeController } from '@nestjs/swagger';
import { Auth } from './auth/auth.decorator';
import { UserService } from './user/user.service';
import { $Enums } from '.prisma/client';
const sharedScripts = [{ jsPath: '/js/all-pages.js' }];

const headerMenuItems = [
  { text: 'Главная', link: '/index' },
  { text: 'Текущие игры', link: '/games' },
  { text: 'Соревнования', link: '/competitions' },
  { text: 'Рейтинг', link: '/ranking' },
];

const adminHeaderMenuItems = [
  { text: 'Соревнования', link: '/admin/competitions' },
  { text: 'Игры', link: '/admin/games' },
  { text: 'Спортсмены', link: '/admin/athletes' },
  { text: 'Администраторы', link: '/admin/admins' },
  { text: 'Выйти', link: '#', id: 'sign-out-btn' },
];

const footerMenuItems = [
  { text: 'Главная', link: '/index' },
  { text: 'Панель администратора', link: '/login' },
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
    private userService: UserService,
  ) {}

  @Get('index')
  @Render('index')
  async getIndex() {
    const styles = [{ cssPath: 'css/index.css' }];
    const scripts = [
      { jsPath: '/js/all-pages.js' },
      { jsPath: '/js/ws/updater.js' },
    ];
    const competitions = await this.competitionService.getAllBefore(
      new Date(Date.now()),
    );
    competitions
      .sort((a, b) => {
        return a.endDate < b.endDate ? 1 : -1;
      })
      .slice(0, competitions.length > 4 ? 4 : competitions.length);

    return {
      styles: styles,
      scripts: scripts,
      headerMenuItems: headerMenuItems,
      competitionsTitle: 'Недавние соревнования',
      competitionItems: competitions,
      gamesTitle: 'Текущие игры',
      gameItems: await this.gameService.getAllByStatus(
        $Enums.GameStatus.STARTED,
      ),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('competitions')
  @Render('competitions')
  async getCompetitions() {
    const styles = [{ cssPath: '/css/competitions.css' }];
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
    const styles = [{ cssPath: '/css/games.css' }];
    const scripts = [
      { jsPath: '/js/all-pages.js' },
      { jsPath: '/js/filters.js' },
      { jsPath: '/js/ws/updater.js' },
    ];
    return {
      styles: styles,
      scripts: scripts,
      headerMenuItems: headerMenuItems,
      gamesTitle: 'Текущие игры',
      showGamesFilter: true,
      gameItems: await this.gameService.getAllByStatus(
        $Enums.GameStatus.STARTED,
      ),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('ranking')
  @Render('ranking')
  async getRanking() {
    const styles = [{ cssPath: '/css/ranking.css' }];
    const athletes = await this.athleteService.getAll();
    athletes.sort((a, b) => {
      return a.score < b.score ? 1 : -1;
    });
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: headerMenuItems,
      athletes: athletes,
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('login')
  @Render('login')
  @Auth('UNAUTHORISED')
  async getLogin() {
    const styles = [{ cssPath: '/css/index.css' }];
    return {
      styles: styles,
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/admin/competitions')
  @Render('admin_competitions')
  @Auth('ADMIN')
  async getAdminCompetitions() {
    const styles = [{ cssPath: '/css/admin.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: adminHeaderMenuItems,
      competitions: await this.competitionService.getAll(),
      athletes: await this.athleteService.getAll(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/admin/athletes')
  @Render('admin_athletes')
  @Auth('ADMIN')
  async getAdminAthletes() {
    const styles = [{ cssPath: '/css/admin.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: adminHeaderMenuItems,
      competitions: await this.competitionService.getAll(),
      athletes: await this.athleteService.getAll(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/admin/games')
  @Render('admin_games')
  @Auth('ADMIN')
  async getAdminGames() {
    const styles = [
      { cssPath: '/css/admin.css' },
      { cssPath: '/css/competitions.css' },
    ];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: adminHeaderMenuItems,
      competitionsTitle: 'Выберите соревнование',
      competitionItems: await this.competitionService.getAll(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/admin/admins')
  @Render('admins')
  @Auth('ADMIN')
  async getAdmins() {
    const styles = [{ cssPath: '/css/admin.css' }];
    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: adminHeaderMenuItems,
      admins: await this.userService.getAll(),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/admin/:id')
  @Render('admin_game')
  @Auth('ADMIN')
  async getAdminGame(@Param('id', ParseIntPipe) id: number) {
    const styles = [{ cssPath: '/css/admin.css' }];

    return {
      styles: styles,
      scripts: sharedScripts,
      headerMenuItems: adminHeaderMenuItems,
      games: await this.gameService.getAllByCompetition(id),
      athletes: await this.athleteService.getAllByCompetition(id),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/admin')
  @Auth('ADMIN')
  async getAdmin(@Res() res) {
    res.redirect('/admin/competitions');
  }

  @Get('/:id')
  @Render('games')
  async getCompetitionGames(@Param('id', ParseIntPipe) id: number) {
    const styles = [{ cssPath: '/css/games.css' }];
    const scripts = sharedScripts;
    scripts.push({ jsPath: '/js/filters.js' });
    const competition = await this.competitionService.get(id);
    return {
      styles: styles,
      scripts: scripts,
      headerMenuItems: headerMenuItems,
      gamesTitle: competition.name,
      showGamesFilter: true,
      gameItems: await this.gameService.getAllByCompetitionAndStatus(
        id,
        $Enums.GameStatus.FINISHED,
      ),
      footerMenuItems: footerMenuItems,
      copyright: copyright,
    };
  }

  @Get('/')
  async get(@Res() res) {
    return res.redirect('/index');
  }
}
