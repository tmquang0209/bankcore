import { CurrencyEntity } from '@entities';

const data = [
  {
    name: 'VND',
    symbol: '₫',
    exchangeRate: 1,
  },
  {
    name: 'USD',
    symbol: '$',
    exchangeRate: 23000,
  },
  {
    name: 'EUR',
    symbol: '€',
    exchangeRate: 25000,
  },
  {
    name: 'JPY',
    symbol: '¥',
    exchangeRate: 200,
  },
];

export class CurrencyEntitySeeder {
  async run() {
    for (const currency of data) {
      const existing = await CurrencyEntity.findOne({
        where: { name: currency.name },
      });
      if (existing) {
        console.log(`✅ Currency "${currency.name}" already exists.`);
        continue;
      }

      await CurrencyEntity.create(currency as CurrencyEntity);
      console.log(
        `✅ Created currency "${currency.name}" (${currency.symbol}) with rate ${currency.exchangeRate}`,
      );
    }
  }
}
