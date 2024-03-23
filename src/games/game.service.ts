import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Injectable()
export class GameService {
  constructor(private httpService: HttpService) {}

  async getMockGames() {
    const response = await firstValueFrom(
      this.httpService.get('https://dummyjson.com/users'),
    );
    const users: [object] = response.data.users;
    const randomizedUsers = users
      .sort(() => 0.5 - Math.random())
      .slice(0, (Math.random() * 4 + 1) * 2);
    return this.getGames(randomizedUsers);
  }

  private getGames(data: any) {
    const games = [];
    if (data && Array.isArray(data)) {
      for (let i = 0; i < data.length - 1; i += 2) {
        const game = new Game();
        const redPlayer = new Player();
        redPlayer.name = this.getPlayerFullName(data[i]);
        redPlayer.score = this.getPlayerScore(data[i]);
        const bluePlayer = new Player();
        bluePlayer.name = this.getPlayerFullName(data[i + 1]);
        bluePlayer.score = this.getPlayerScore(data[i + 1]);
        game.round = Math.floor(Math.random() * 4 + 1);
        game.redPlayer = redPlayer;
        game.bluePlayer = bluePlayer;
        games.push(game);
      }
    }

    return games;
  }

  private getPlayerFullName(player: any): string {
    return player.firstName + ' ' + player.lastName;
  }

  private getPlayerScore(player: any): number {
    return Math.floor(player.weight / (Math.random() * 10 + 10));
  }
}
