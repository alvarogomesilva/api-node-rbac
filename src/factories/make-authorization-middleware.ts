import { AuthorizationMiddleware } from '../application/middlewares/authorization-middleware';
import { GetRolePermissionUseCase } from '../application/use-cases/get-role-permission-use-case';

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  return new AuthorizationMiddleware(
    requiredPermissions,
    new GetRolePermissionUseCase()
  );
}
