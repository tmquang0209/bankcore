import { RoleEntity } from '@entities';

export const roleSeeds = [
  {
    code: 'admin',
    name: 'Quản trị viên',
    description: 'Vai trò quản trị viên với quyền truy cập đầy đủ',
    permissions: [
      'customer:create',
      'customer:read',
      'customer:update',
      'customer:delete',
      'account:create',
      'account:read',
      'account:update',
      'account:delete',
      'transaction:create',
      'transaction:read',
      'card:create',
      'card:read',
      'card:update',
      'loan:create',
      'loan:read',
      'loan:update',
      'loan-schedule:read',
      'loan-schedule:update',
      'staff:create',
      'staff:read',
      'staff:update',
      'staff:delete',
      'staff-account:update',
      'role:manage',
      'permission:manage',
      'role:assign',
      'permission:assign',
      'audit-log:read',
      'customer-log:read',
      'notification:manage',
      'category:manage',
    ],
  },
  {
    code: 'nhan_vien',
    name: 'Nhân viên',
    description: 'Nhân viên quầy giao dịch',
    permissions: [
      'customer:create',
      'customer:read',
      'customer:update',
      'account:create',
      'account:read',
      'account:update',
      'transaction:create',
      'transaction:read',
      'card:create',
      'card:read',
      'loan:create',
      'loan:read',
      'loan-schedule:read',
      'notification:manage',
    ],
  },
  {
    code: 'giao_dich_vien',
    name: 'Giao dịch viên',
    description: 'Xử lý các giao dịch và phát hành thẻ',
    permissions: [
      'transaction:create',
      'transaction:read',
      'card:create',
      'card:read',
      'account:read',
    ],
  },
  {
    code: 'nhan_vien_tin_dung',
    name: 'Nhân viên tín dụng',
    description: 'Quản lý các khoản vay và lịch trả nợ',
    permissions: [
      'loan:create',
      'loan:read',
      'loan:update',
      'loan-schedule:read',
      'loan-schedule:update',
    ],
  },
  {
    code: 'ke_toan',
    name: 'Kế toán',
    description: 'Giám sát tài chính, số dư và giao dịch',
    permissions: [
      'account:read',
      'account:update',
      'transaction:read',
      'audit-log:read',
    ],
  },
  {
    code: 'khach_hang',
    name: 'Khách hàng',
    description:
      'Người dùng hệ thống – xem tài khoản, giao dịch, vay và thông báo',
    permissions: [
      'account:read',
      'transaction:read',
      'card:read',
      'loan:read',
      'loan-schedule:read',
      'notification:manage',
      'customer-log:read',
    ],
  },
];

export class RoleSeeder {
  async truncate() {
    await RoleEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await RoleEntity.destroy({
      where: {},
      truncate: true,
    });
    await RoleEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();
    const cleanedRoleSeeds = roleSeeds.map((role) => ({
      code: role.code,
      name: role.name,
      description: role.description,
    }));
    await RoleEntity.bulkCreate(cleanedRoleSeeds as RoleEntity[], {
      ignoreDuplicates: true,
      returning: true,
    });
  }
}
