import {
  AccountEntity,
  TransactionEntity,
  TransactionTypeEntity,
} from '@entities';

export class TransactionEntitySeeder {
  async truncate() {
    await TransactionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await TransactionEntity.destroy({
      where: {},
      truncate: true,
    });
    await TransactionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    // Generate random transactions
    const transactions: TransactionEntity[] = [];

    // each account will have 1-5 transactions
    const accounts = await AccountEntity.findAll({
      attributes: ['id'],
      raw: true,
      nest: true,
      order: [['id', 'ASC']],
    });

    const transactionTypes = await TransactionTypeEntity.findAll();

    for (const account of accounts) {
      const numberOfTransactions = Math.floor(Math.random() * 5) + 1; // Randomly choose 1 to 5 transactions per account
      for (let i = 0; i < numberOfTransactions; i++) {
        // random recipientAccountId
        const recipientAccountId =
          accounts[Math.floor(Math.random() * accounts.length)].id;

        const transaction = {
          accountId: account.id,
          recipientAccountId,
          transactionTypeId:
            transactionTypes[
              Math.floor(Math.random() * transactionTypes.length)
            ].id,
          employeeId: undefined,
          amount: Math.floor(Math.random() * 10000),
          description: `Giao dịch ${i + 1} cho tài khoản ${account.id}`,
          transactionTime: new Date(),
        };
        transactions.push(transaction as unknown as TransactionEntity);
      }
    }

    await TransactionEntity.bulkCreate(transactions, {
      ignoreDuplicates: true,
      validate: true,
    });
  }
}
