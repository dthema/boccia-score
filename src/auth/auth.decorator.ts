import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard),
  );
}
