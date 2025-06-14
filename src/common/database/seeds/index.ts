import { Logger } from '@nestjs/common';
import { AccountTypeEntitySeeder } from './account-type.seed';
import { AccountEntitySeeder } from './account.seed';
import { CurrencyEntitySeeder } from './currency.seed';
import { CustomerEntitySeeder } from './customer.seed';
import { EmployeeEntitySeeder } from './employee.seed';
import { PermissionSeeder } from './permission.seed';
import { RolePermissionsSeeder } from './role-permissions.seed';
import { RoleSeeder } from './role.seed';
import { TransactionTypeEntitySeeder } from './transaction-type.seed';
import { TransactionEntitySeeder } from './transaction.seed';

export class Seeder {
  async run() {
    const permissionSeeder = new PermissionSeeder();
    const roleSeeder = new RoleSeeder();
    const rolePermissionsSeeder = new RolePermissionsSeeder();
    const employeeSeeder = new EmployeeEntitySeeder();
    const currencySeeder = new CurrencyEntitySeeder();
    const customerSeeder = new CustomerEntitySeeder();
    const transactionTypeSeeder = new TransactionTypeEntitySeeder();
    const accountTypeSeeder = new AccountTypeEntitySeeder();
    const accountSeeder = new AccountEntitySeeder();
    const transactionSeeder = new TransactionEntitySeeder();

    Logger.log('Seeding database...');

    // await permissionSeeder.run();
    // await roleSeeder.run();
    // await rolePermissionsSeeder.run();
    // await employeeSeeder.run();
    // await currencySeeder.run();
    // await customerSeeder.run();
    // await transactionTypeSeeder.run();
    // await accountTypeSeeder.run();
    // await accountSeeder.run();
    // await transactionSeeder.run();

    Logger.log('Database seeded successfully.');
  }
}
