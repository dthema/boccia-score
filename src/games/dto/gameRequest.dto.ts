import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '.prisma/client';

export class GameRequestDto {
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
