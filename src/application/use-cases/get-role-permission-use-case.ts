import { prisma } from '../lib/prisma-client';

interface Input {
  roleId: string;
}

interface Output {
  permissionsCodes: string[];
}

export class GetRolePermissionUseCase {
  async execute({ roleId }: Input): Promise<Output> {
    const rolesPermissions = await prisma.rolePermission.findMany({
        where: { roleId },
        select: {
            permissionCode: true
        }
    })

    const permissionsCodes = rolesPermissions.map((rolesPermissions) => 
        rolesPermissions.permissionCode
    )

    return { permissionsCodes }
   
  }
}
