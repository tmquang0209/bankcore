import { PermissionEntity } from '@entities';
import { Logger } from '@nestjs/common';

export const permissionSeed = [
  // === KHÁCH HÀNG ===
  {
    code: 'customer:create',
    name: 'Tạo khách hàng',
    description: 'Cho phép tạo mới khách hàng',
  },
  {
    code: 'customer:read',
    name: 'Xem khách hàng',
    description: 'Cho phép xem danh sách và thông tin khách hàng',
  },
  {
    code: 'customer:update',
    name: 'Cập nhật khách hàng',
    description: 'Cho phép chỉnh sửa thông tin khách hàng',
  },
  {
    code: 'customer:delete',
    name: 'Xóa khách hàng',
    description: 'Cho phép xóa khách hàng khỏi hệ thống',
  },

  // === TÀI KHOẢN NGÂN HÀNG ===
  {
    code: 'account:create',
    name: 'Tạo tài khoản ngân hàng',
    description: 'Cho phép mở tài khoản ngân hàng cho khách hàng',
  },
  {
    code: 'account:read',
    name: 'Xem tài khoản ngân hàng',
    description: 'Cho phép xem thông tin tài khoản ngân hàng',
  },
  {
    code: 'account:update',
    name: 'Cập nhật tài khoản ngân hàng',
    description: 'Cho phép chỉnh sửa thông tin tài khoản ngân hàng',
  },
  {
    code: 'account:delete',
    name: 'Xóa tài khoản ngân hàng',
    description: 'Cho phép xóa tài khoản ngân hàng',
  },

  // === GIAO DỊCH ===
  {
    code: 'transaction:read',
    name: 'Xem giao dịch',
    description: 'Cho phép xem danh sách và chi tiết giao dịch',
  },
  {
    code: 'transaction:create',
    name: 'Tạo giao dịch',
    description: 'Cho phép tạo giao dịch thủ công',
  },

  // === THẺ NGÂN HÀNG ===
  {
    code: 'card:create',
    name: 'Cấp thẻ',
    description: 'Cho phép phát hành thẻ ngân hàng',
  },
  {
    code: 'card:read',
    name: 'Xem thẻ',
    description: 'Cho phép xem thông tin thẻ',
  },
  {
    code: 'card:update',
    name: 'Cập nhật thẻ',
    description: 'Cho phép cập nhật thông tin thẻ',
  },

  // === KHOẢN VAY ===
  {
    code: 'loan:create',
    name: 'Tạo khoản vay',
    description: 'Cho phép tạo mới khoản vay cho khách hàng',
  },
  {
    code: 'loan:read',
    name: 'Xem khoản vay',
    description: 'Cho phép xem thông tin các khoản vay',
  },
  {
    code: 'loan:update',
    name: 'Cập nhật khoản vay',
    description: 'Cho phép cập nhật thông tin khoản vay',
  },

  // === LỊCH TRẢ KHOẢN VAY ===
  {
    code: 'loan-schedule:read',
    name: 'Xem lịch trả khoản vay',
    description: 'Cho phép xem lịch thanh toán của khoản vay',
  },
  {
    code: 'loan-schedule:update',
    name: 'Cập nhật lịch trả',
    description: 'Cho phép chỉnh sửa thông tin trả nợ',
  },

  // === NHÂN VIÊN ===
  {
    code: 'staff:create',
    name: 'Tạo nhân viên',
    description: 'Cho phép thêm mới nhân viên',
  },
  {
    code: 'staff:read',
    name: 'Xem nhân viên',
    description: 'Cho phép xem thông tin nhân viên',
  },
  {
    code: 'staff:update',
    name: 'Cập nhật nhân viên',
    description: 'Cho phép chỉnh sửa thông tin nhân viên',
  },
  {
    code: 'staff:delete',
    name: 'Xóa nhân viên',
    description: 'Cho phép xóa nhân viên',
  },

  // === TÀI KHOẢN NHÂN VIÊN ===
  {
    code: 'staff-account:update',
    name: 'Quản lý tài khoản nhân viên',
    description: 'Cho phép quản lý đăng nhập và vai trò của nhân viên',
  },

  // === VAI TRÒ VÀ PHÂN QUYỀN ===
  {
    code: 'role:manage',
    name: 'Quản lý vai trò',
    description: 'Cho phép tạo, cập nhật và xóa vai trò',
  },
  {
    code: 'permission:manage',
    name: 'Quản lý quyền',
    description: 'Cho phép cấu hình các quyền truy cập',
  },
  {
    code: 'role:assign',
    name: 'Gán vai trò',
    description: 'Cho phép gán vai trò cho người dùng',
  },
  {
    code: 'permission:assign',
    name: 'Gán quyền',
    description: 'Cho phép gán quyền cho vai trò',
  },

  // === NHẬT KÝ HỆ THỐNG ===
  {
    code: 'audit-log:read',
    name: 'Xem nhật ký hệ thống',
    description: 'Cho phép xem hoạt động hệ thống của nhân viên',
  },
  {
    code: 'customer-log:read',
    name: 'Xem nhật ký khách hàng',
    description: 'Cho phép xem hành động khách hàng đã thực hiện',
  },

  // === THÔNG BÁO ===
  {
    code: 'notification:manage',
    name: 'Quản lý thông báo',
    description: 'Cho phép tạo và gửi thông báo đến khách hàng',
  },

  // === DANH MỤC HỆ THỐNG ===
  {
    code: 'category:manage',
    name: 'Quản lý danh mục hệ thống',
    description:
      'Cho phép cấu hình các loại tài khoản, giao dịch, thẻ, vay, tiền tệ,...',
  },
];

export class PermissionSeeder {
  async truncate() {
    await PermissionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await PermissionEntity.destroy({
      where: {},
      truncate: true,
    });
    await PermissionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    await PermissionEntity.bulkCreate(permissionSeed as PermissionEntity[], {
      ignoreDuplicates: true,
      validate: true,
    });

    Logger.log('Permissions seeded successfully.');
  }
}
