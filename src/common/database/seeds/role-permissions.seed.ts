import { PermissionEntity, RoleEntity, RolePermissionsEntity } from '@entities';
import { roleSeeds } from './role.seed';

export class RolePermissionsSeeder {
  async truncate() {
    await RolePermissionsEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await RolePermissionsEntity.destroy({ where: {}, truncate: true });
    await RolePermissionsEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();

    const roles = await RoleEntity.findAll();
    const permissions = await PermissionEntity.findAll();

    const roleMap = new Map(roles.map((r) => [r.code, r]));
    const permissionMap = new Map(permissions.map((p) => [p.code, p]));

    const rolePermissions: RolePermissionsEntity[] = [];

    for (const seed of roleSeeds) {
      const role = roleMap.get(seed.code);
      if (!role) {
        console.warn(`⚠️ Role not found in DB: ${seed.code}`);
        continue;
      }

      for (const permissionCode of seed.permissions) {
        const permission = permissionMap.get(permissionCode);
        if (!permission) {
          console.warn(`⚠️ Permission not found in DB: ${permissionCode}`);
          continue;
        }

        rolePermissions.push({
          roleId: role.id,
          permissionId: permission.id,
        } as RolePermissionsEntity);
      }
    }

    await RolePermissionsEntity.bulkCreate(rolePermissions);
    console.log(`✅ Seeded ${rolePermissions.length} role-permission records.`);
  }
}
