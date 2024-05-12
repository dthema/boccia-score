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

    const cookies = context.switchToHttp().getRequest().cookies;
    const idToken = cookies['jwt'];

    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const response = context.switchToHttp().getResponse();
    if (idToken == undefined) {
      if (permissions[0] === 'UNAUTHORISED') {
        return true;
      }
      response.redirect('/login');
    }

    try {
      const claims = await app.auth().verifyIdToken(idToken);

      if (permissions[0] === 'UNAUTHORISED' && claims.role === 'ADMIN') {
        response.redirect('/admin');
      }

      return claims.role === permissions[0];
    } catch (error) {
      console.log(error.message);
      context.switchToHttp().getResponse().clearCookie('jwt', { path: '/' });
      response.redirect('/login');
    }
  }
}
