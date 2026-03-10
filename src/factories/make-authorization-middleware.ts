import { AuthorizationMiddleware } from '../application/middlewares/authorization-middleware';

export function makeAuthorizationMiddleware(allowedRoles: string[]) {
  return new AuthorizationMiddleware(allowedRoles);
}
