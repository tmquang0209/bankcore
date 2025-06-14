import { TransactionTypeEntity } from '@entities';

const transactionTypeSeeds = [
  {
    name: 'Nạp tiền',
    description: 'Nạp tiền vào tài khoản',
  },
  {
    name: 'Rút tiền',
    description: 'Rút tiền từ tài khoản',
  },
  {
    name: 'Chuyển khoản',
    description: 'Chuyển tiền giữa các tài khoản',
  },
  {
    name: 'Thanh toán hóa đơn',
    description: 'Thanh toán các loại hóa đơn',
  },
  {
    name: 'Đặt cọc',
    description: 'Đặt cọc cho các giao dịch',
  },
  {
    name: 'Hoàn tiền',
    description: 'Hoàn tiền cho khách hàng',
  },
  {
    name: 'Phí dịch vụ',
    description: 'Phí dịch vụ cho các giao dịch',
  },
  {
    name: 'Khác',
    description: 'Các loại giao dịch khác không thuộc danh mục trên',
  },
];

export class TransactionTypeEntitySeeder {
  async truncate() {
    await TransactionTypeEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await TransactionTypeEntity.destroy({
      where: {},
      truncate: true,
    });
    await TransactionTypeEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    await TransactionTypeEntity.bulkCreate(
      transactionTypeSeeds as TransactionTypeEntity[],
      {
        ignoreDuplicates: true,
        validate: true,
      },
    );
  }
}
