import { prisma } from '../lib/prisma-client';

interface Input {
  roleId: string;
}

interface Output {
  permissionsCode: string[];
}

export class GetRolePermissionUseCase {
  async execute({ roleId }: Input): Promise<Output> {
    const rolesPermissions = await prisma.rolePermission.findMany({
        where: { roleId },
        select: {
            permissionCode: true
        }
    })

    const permissionsCode = rolesPermissions.map((rolesPermissions) => 
        rolesPermissions.permissionCode
    )

    return { permissionsCode }
   
  }
}
