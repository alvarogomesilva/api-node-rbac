import { AuthenticationMiddleware } from '../application/middlewares/authentication-middleware';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
