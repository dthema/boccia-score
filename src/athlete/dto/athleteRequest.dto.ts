import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '.prisma/client';
import { IsEnum, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class AthleteRequestDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  patronymicName?: string | null;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  @ApiProperty()
  region: string;

  @Min(0)
  @ApiProperty()
  score?: number;

  @IsEnum($Enums.AthleteClass)
  @ApiProperty({ enum: $Enums.AthleteClass })
  class: $Enums.AthleteClass;
}
