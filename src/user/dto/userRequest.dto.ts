import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  @ApiProperty({
    type: String,
  })
  password: string;
}
