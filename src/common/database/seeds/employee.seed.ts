import { EGender } from '@common/enums';
import { EmployeeEntity, RoleEntity } from '@entities';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';

export class EmployeeEntitySeeder {
  async truncate() {
    await EmployeeEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await EmployeeEntity.destroy({
      where: {},
      truncate: true,
    });
    await EmployeeEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    const roles = await RoleEntity.findAll();

    for (const role of roles) {
      const gender = faker.helpers.arrayElement([EGender.MALE, EGender.FEMALE]);
      const name = faker.person.fullName({
        sex: gender === EGender.MALE ? 'male' : 'female',
      });

      console.log(`Creating employee for role: ${role.code}`);
      const username =
        slugify(name, {
          lower: true,
          strict: true,
          replacement: '_',
        }) + `_${role.code}`;
      const email = `${username}@example.com`;

      const existing = await EmployeeEntity.findOne({
        where: { username },
      });

      if (existing) {
        console.log(`✅ Employee for role "${role.code}" already exists.`);
        continue;
      }

      const fakePhoneNumber = '0' + faker.string.numeric(9);
      const employee: EmployeeEntity = {
        name,
        email,
        gender,
        phone: fakePhoneNumber,
        username,
        password: '123456',
        roleId: role.id,
        status: true,
      } as EmployeeEntity;

      await EmployeeEntity.create(employee);
      console.log(
        `✅ Created employee for role "${role.code}" with username "${username}"`,
      );
    }
  }
}
