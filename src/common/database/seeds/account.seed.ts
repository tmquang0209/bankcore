import { EAccountStatus } from '@common/enums';
import {
  AccountEntity,
  AccountTypeEntity,
  CurrencyEntity,
  CustomerEntity,
} from '@entities';

export class AccountEntitySeeder {
  async truncate() {
    await AccountEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await AccountEntity.destroy({
      where: {},
      truncate: true,
    });
    await AccountEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    // each customer will have 1-3 different accounts
    const customers = await CustomerEntity.findAll();
    const accountTypes = await AccountTypeEntity.findAll();
    const currencies = await CurrencyEntity.findAll();

    const accountSeeds: AccountEntity[] = [];
    for (const customer of customers) {
      const numberOfAccounts = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 to 3 accounts per customer
      for (let i = 0; i < numberOfAccounts; i++) {
        const accountType =
          accountTypes[Math.floor(Math.random() * accountTypes.length)];
        const currency =
          currencies[Math.floor(Math.random() * currencies.length)];
        const status =
          Object.values(EAccountStatus)[
            Math.floor(Math.random() * Object.values(EAccountStatus).length)
          ];

        const account = {
          customerId: customer.id,
          accountTypeId: accountType.id,
          balance: Math.floor(Math.random() * 1000000),
          status,
          accountNumber: `${Math.floor(Math.random() * 1000000000000)}`,
          currencyId: currency.id,
          openingDate: new Date(),
        };
        accountSeeds.push(account as unknown as AccountEntity);
      }
    }
    await AccountEntity.bulkCreate(accountSeeds, {
      ignoreDuplicates: true,
      validate: true,
    });
  }
}
