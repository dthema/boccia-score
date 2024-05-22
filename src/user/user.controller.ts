import { Controller, Post, Body, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/userRequest.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDeleteRequestDto } from './dto/userDeleteRequest.dto';
import { Auth } from '../auth/auth.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @Auth('ADMIN')
  create(@Body() userRequest: UserRequestDto) {
    return this.userService.create(userRequest);
  }

  @Delete()
  @ApiBearerAuth()
  @Auth('ADMIN')
  delete(@Body() userDeleteRequest: UserDeleteRequestDto) {
    return this.userService.delete(userDeleteRequest.email);
  }
}
