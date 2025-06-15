import { EAccountStatus } from '@common/enums';
import { CreateBankAccountDto, UpdateBankAccountDto } from '@dto';
import {
  AccountEntity,
  AccountTypeEntity,
  CurrencyEntity,
  CustomerEntity,
} from '@entities';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(AccountEntity)
    private readonly accountRepo: typeof AccountEntity,
    @InjectModel(AccountTypeEntity)
    private readonly accountTypeRepo: typeof AccountTypeEntity,
    @InjectModel(CustomerEntity)
    private readonly customerRepo: typeof CustomerEntity,
    @InjectModel(CurrencyEntity)
    private readonly currencyRepo: typeof CurrencyEntity,
  ) {}

  async createAccount(dto: CreateBankAccountDto): Promise<AccountEntity> {
    const customer = await this.customerRepo.findByPk(dto.customerId);
    if (!customer) throw new NotFoundException('Khách hàng không tồn tại');

    const accountType = await this.accountTypeRepo.findByPk(dto.accountTypeId);
    if (!accountType)
      throw new NotFoundException('Loại tài khoản không tồn tại');

    const currency = await this.currencyRepo.findByPk(dto.currencyId);
    if (!currency) throw new NotFoundException('Loại tiền tệ không tồn tại');

    const account = await this.accountRepo.create({
      customerId: dto.customerId,
      accountTypeId: dto.accountTypeId,
      currencyId: dto.currencyId,
      accountNumber: dto.accountNumber,
      balance: 0,
      openingDate: new Date(),
      status: EAccountStatus.ACTIVE,
    } as AccountEntity);

    return account;
  }

  async getAllAccounts(): Promise<AccountEntity[]> {
    return await this.accountRepo.findAll({
      include: [{ model: CustomerEntity }, { model: AccountTypeEntity }],
    });
  }

  async getAccountById(id: string): Promise<AccountEntity> {
    const account = await this.accountRepo.findByPk(id, {
      include: [{ model: CustomerEntity }, { model: AccountTypeEntity }],
    });

    if (!account) throw new NotFoundException('Không tìm thấy tài khoản');
    return account;
  }

  async updateAccount(
    id: string,
    dto: UpdateBankAccountDto,
  ): Promise<AccountEntity> {
    const account = await this.accountRepo.findByPk(id);
    if (!account) throw new NotFoundException('Tài khoản không tồn tại');

    if (dto.accountTypeId) {
      const accountType = await this.accountTypeRepo.findByPk(
        dto.accountTypeId,
      );
      if (!accountType) {
        throw new BadRequestException('Loại tài khoản không hợp lệ');
      }
    }

    if (dto.currencyId) {
      const currency = await this.currencyRepo.findByPk(dto.currencyId);
      if (!currency) {
        throw new BadRequestException('Loại tiền tệ không hợp lệ');
      }
    }

    await account.update(dto);
    return account;
  }

  async closeAccount(id: string): Promise<void> {
    const account = await this.accountRepo.findByPk(id);
    if (!account) throw new NotFoundException('Tài khoản không tồn tại');

    account.status = EAccountStatus.CLOSED;
    await account.save();
  }
}
