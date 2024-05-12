import { $Enums } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GameEntity } from '../entity/game.entity';

export class GameDto {
  constructor({ ...entity }: Partial<GameEntity>) {
    const keys = ['redAthlete', 'blueAthlete', 'competition'];
    Object.assign(
      this,
      Object.fromEntries(
        Object.entries(entity).filter(([key]) => !keys.includes(key)),
      ),
    );

    if (entity.redAthlete) {
      this.redAthleteId = entity.redAthlete.id;
    }
    if (entity.blueAthlete) {
      this.blueAthleteId = entity.blueAthlete.id;
    }
    if (entity.competition) {
      this.competitionId = entity.competition.id;
    }
  }

  @ApiProperty({ enum: $Enums.AthleteClass })
  class: $Enums.AthleteClass;

  @ApiProperty({ enum: $Enums.GameStatus })
  status: $Enums.GameStatus;

  @ApiProperty({
    type: Number,
  })
  redScore: number;

  @ApiProperty({
    type: Number,
  })
  blueScore: number;

  @ApiProperty({
    type: Number,
  })
  round: number;

  @ApiProperty({
    type: Number,
  })
  competitionId: number;

  @ApiProperty({
    type: Number,
  })
  redAthleteId: number;

  @ApiProperty({
    type: Number,
  })
  blueAthleteId: number;
}
