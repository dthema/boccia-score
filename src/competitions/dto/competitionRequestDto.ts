import { ApiProperty } from '@nestjs/swagger';

export class CompetitionRequestDto {
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
