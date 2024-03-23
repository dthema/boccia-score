import { Player } from './player';
import { AthleteClass } from './athlete';

export class Game {
  type: AthleteClass;
  status: GameStatus;
  redPlayer: Player;
  bluePlayer: Player;
  round: number;
  link: string = '#';
}

enum GameStatus {
  CREATED,
  STARTED,
  FINISHED,
}
