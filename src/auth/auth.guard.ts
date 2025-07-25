import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseAdmin } from '../firebase/firebase.setup';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly admin: FirebaseAdmin,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();

    let idToken = context.switchToHttp().getRequest().headers['authorization'];

    if (idToken == undefined || idToken === '') {
      const cookies = context.switchToHttp().getRequest().cookies;
      idToken = cookies['jwt'];
    } else if (idToken.startsWith('Bearer ')) {
      idToken = idToken.split('Bearer ')[1];
    }

    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const response = context.switchToHttp().getResponse();
    if (idToken == undefined) {
      if (permissions == undefined || permissions[0] === 'UNAUTHORISED') {
        return true;
      }
      response.redirect('/login');
      return false;
    }

    try {
      const claims = await app.auth().verifyIdToken(idToken);

      if (
        permissions != undefined &&
        permissions[0] === 'UNAUTHORISED' &&
        claims.permissions === 'ADMIN'
      ) {
        response.redirect('/admin');
        return true;
      }

      return (
        (claims.permissions == 'ADMIN' && permissions == undefined) ||
        claims.permissions === permissions[0]
      );
    } catch (error) {
      console.log(error.message);
      context.switchToHttp().getResponse().clearCookie('jwt', { path: '/' });
      response.redirect('/login');
      return false;
    }
  }
}
