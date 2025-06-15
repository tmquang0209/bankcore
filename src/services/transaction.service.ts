import { CreateTransactionDto } from '@dto';
import {
  AccountEntity,
  EmployeeEntity,
  TransactionEntity,
  TransactionTypeEntity,
} from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionEntity)
    private readonly transactionRepo: typeof TransactionEntity,

    @InjectModel(AccountEntity)
    private readonly accountRepo: typeof AccountEntity,

    @InjectModel(TransactionTypeEntity)
    private readonly transactionTypeRepo: typeof TransactionTypeEntity,

    @InjectModel(EmployeeEntity)
    private readonly employeeRepo: typeof EmployeeEntity,
  ) {}

  async create(dto: CreateTransactionDto): Promise<TransactionEntity> {
    const account = await this.accountRepo.findByPk(dto.accountId);
    if (!account) throw new NotFoundException('Tài khoản không tồn tại');

    const transactionType = await this.transactionTypeRepo.findByPk(
      dto.transactionTypeId,
    );
    if (!transactionType)
      throw new NotFoundException('Loại giao dịch không tồn tại');

    const employee = await this.employeeRepo.findByPk(dto.employeeId);
    if (!employee) throw new NotFoundException('Nhân viên không tồn tại');

    const transaction = await this.transactionRepo.create({
      accountId: dto.accountId,
      transactionTypeId: dto.transactionTypeId,
      employeeId: dto.employeeId,
      amount: dto.amount,
      receiverId: dto.receiverId,
      description: dto.description,
      transactionTime: new Date(),
    } as TransactionEntity);

    return transaction;
  }

  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionRepo.findAll({
      include: [
        { model: AccountEntity },
        { model: TransactionTypeEntity },
        { model: EmployeeEntity },
      ],
    });
  }

  async findById(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepo.findByPk(id, {
      include: [
        { model: AccountEntity },
        { model: TransactionTypeEntity },
        { model: EmployeeEntity },
      ],
    });

    if (!transaction) throw new NotFoundException('Không tìm thấy giao dịch');

    return transaction;
  }
}
