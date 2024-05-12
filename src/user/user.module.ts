import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.service';
import { FirebaseAdmin } from '../firebase/firebase.setup';
import { UserController } from './user.controller';

@Module({
  imports: [HttpModule],
  providers: [UserService, FirebaseAdmin],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
