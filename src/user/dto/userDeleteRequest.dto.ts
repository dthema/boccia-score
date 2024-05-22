import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  email: string;
}
