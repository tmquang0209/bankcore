import { EGender } from '@common/enums';
import { CustomerEntity } from '@entities';
import { faker } from '@faker-js/faker';

export class CustomerEntitySeeder {
  async truncate() {
    await CustomerEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await CustomerEntity.destroy({
      where: {},
      truncate: true,
    });
    await CustomerEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
  async run() {
    const customersToCreate = 20;

    for (let i = 0; i < customersToCreate; i++) {
      const gender = faker.helpers.arrayElement([EGender.MALE, EGender.FEMALE]);

      const name = faker.person.fullName({
        sex: gender === EGender.MALE ? 'male' : 'female',
      });

      const username = faker.internet
        .username({ firstName: name.split(' ')[0] })
        .toLowerCase();
      const email = faker.internet
        .email({ firstName: name.split(' ')[0] })
        .toLowerCase();
      const phone = '0' + faker.string.numeric(9);
      const citizenId = faker.string.numeric(12);
      const address = faker.location.streetAddress();

      const existing = await CustomerEntity.findOne({ where: { username } });
      if (existing) {
        console.log(`⚠️  Username "${username}" already exists. Skipping...`);
        continue;
      }

      await CustomerEntity.create({
        name,
        email,
        gender,
        phone,
        address,
        citizenId,
        username,
        password: '123456',
      } as CustomerEntity);

      console.log(`✅ Created customer "${name}" with username "${username}"`);
    }
  }
}
