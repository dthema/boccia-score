import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '.prisma/client';

export class AthleteDto {
  constructor({ ...data }: Partial<AthleteDto>) {
    Object.assign(this, data);
  }

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
