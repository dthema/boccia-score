import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiTags('user')
  @ApiBearerAuth()
  create(@Body() userRequest: UserDto) {
    return this.userService.createUser(userRequest);
  }
}
