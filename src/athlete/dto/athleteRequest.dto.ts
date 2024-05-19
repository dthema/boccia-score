import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '.prisma/client';

export class AthleteRequestDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  patronymicName?: string | null;

  @ApiProperty()
  region: string;

  @ApiProperty()
  score?: number;

  @ApiProperty({ enum: $Enums.AthleteClass })
  class: $Enums.AthleteClass;
}
