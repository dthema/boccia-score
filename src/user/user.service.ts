import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseAdmin } from '../firebase/firebase.setup';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly admin: FirebaseAdmin) {}

  async create(userRequest: UserRequestDto): Promise<any> {
    const { email, password } = userRequest;
    const app = this.admin.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
      });
      await app
        .auth()
        .setCustomUserClaims(createdUser.uid, { permissions: 'ADMIN' });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(email: string): Promise<any> {
    const app = this.admin.setup();

    try {
      const user = await app.auth().getUserByEmail(email);
      await app.auth().deleteUser(user.uid);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<any> {
    const app = this.admin.setup();

    try {
      const users = await app.auth().listUsers();
      return users.users.map(
        (x) => new UserDto(x.email, x.metadata.creationTime),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
