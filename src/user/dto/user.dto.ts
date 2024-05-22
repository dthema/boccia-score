import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  constructor(email: string, creationDate: string) {
    this.email = email;
    this.creationDate = creationDate;
  }

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  creationDate: string;
}
