import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CompetitionRequestDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty({
    type: Number,
    isArray: true,
  })
  athleteIds: number[];
}
