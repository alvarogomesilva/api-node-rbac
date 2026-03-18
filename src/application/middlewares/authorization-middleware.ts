import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { IRequest } from '../interfaces/IRequest';
import { GetRolePermissionUseCase } from '../use-cases/get-role-permission-use-case';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionsUseCase: GetRolePermissionUseCase
  ) { }

  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied. (authorization 1)',
        },
      };
    }
    const { permissionsCodes } = await this.getRolePermissionsUseCase.execute({
      roleId: account.role,
    });

    const isAllowed = this.requiredPermissions.some(code => (
      permissionsCodes.includes(code)
    ));



    if (!isAllowed) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied. (authorization 2)',
        },
      };
    }

    return {
      data: {},
    };
  }
}
