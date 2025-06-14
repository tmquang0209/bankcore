import { AccountTypeEntity } from '@entities';

const accountTypeSeed = [
  {
    name: 'Tài khoản thanh toán',
    description:
      'Tài khoản dùng cho các giao dịch hàng ngày, chuyển khoản, nhận tiền, thanh toán hóa đơn.',
    code: 'current',
  },
  {
    name: 'Tài khoản tiết kiệm',
    description:
      'Tài khoản tích lũy với lãi suất ưu đãi, giúp khách hàng sinh lời từ số dư.',
    code: 'savings',
  },
  {
    name: 'Tài khoản doanh nghiệp',
    description:
      'Tài khoản dành cho doanh nghiệp, hỗ trợ quản lý tài chính và giao dịch lớn.',
    code: 'business',
  },
  {
    name: 'Tài khoản quốc tế',
    description: 'Tài khoản hỗ trợ giao dịch ngoại tệ và chuyển tiền quốc tế.',
    code: 'international',
  },
  {
    name: 'Thẻ tín dụng',
    description:
      'Tài khoản thẻ tín dụng với hạn mức chi tiêu và ưu đãi hoàn tiền.',
    code: 'credit_card',
  },
  {
    name: 'Thẻ ghi nợ',
    description:
      'Tài khoản thẻ ghi nợ liên kết trực tiếp với tài khoản thanh toán.',
    code: 'debit_card',
  },
  {
    name: 'Tài khoản ưu đãi',
    description: 'Tài khoản số đẹp, nhiều ưu đãi dành cho khách hàng VIP.',
    code: 'premium',
  },
];

export class AccountTypeEntitySeeder {
  async truncate() {
    await AccountTypeEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await AccountTypeEntity.destroy({
      where: {},
      truncate: true,
    });
    await AccountTypeEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();

    await AccountTypeEntity.bulkCreate(accountTypeSeed as AccountTypeEntity[], {
      ignoreDuplicates: true,
      validate: true,
    });
  }
}
