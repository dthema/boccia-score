import { $Enums } from '.prisma/client';

export class GameEntity {
  constructor({ ...data }: Partial<GameEntity>) {
    Object.assign(this, data);
  }

  id: number;
  class: $Enums.AthleteClass;
  status?: $Enums.GameStatus;
  redScore?: number;
  blueScore?: number;
  round?: number;
  competition: GameCompetitionEntity;
  redAthlete: GameAthleteEntity;
  blueAthlete: GameAthleteEntity;
}

export class GameCompetitionEntity {
  id: number;
}

export class GameAthleteEntity {
  id: number;
  firstName: string;
  lastName: string;
  patronymicName?: string | null;
}
