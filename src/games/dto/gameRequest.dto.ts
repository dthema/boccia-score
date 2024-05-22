import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '.prisma/client';
import { IsDecimal, IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class GameRequestDto {
  @IsEnum($Enums.AthleteClass)
  @ApiProperty({ enum: $Enums.AthleteClass })
  class: $Enums.AthleteClass;

  @IsEnum($Enums.GameStatus)
  @ApiProperty({ enum: $Enums.GameStatus })
  status: $Enums.GameStatus;

  @Min(0)
  @IsInt()
  @ApiProperty({
    type: Number,
  })
  redScore: number;

  @Min(0)
  @IsInt()
  @ApiProperty({
    type: Number,
  })
  blueScore: number;

  @Min(0)
  @Max(7)
  @IsInt()
  @ApiProperty({
    type: Number,
  })
  round: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  competitionId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  redAthleteId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  blueAthleteId: number;
}
