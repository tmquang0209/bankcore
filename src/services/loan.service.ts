import { CreateLoanDto, LoanDetailDto, LoanListItemDto } from '@dto';
import { LoanEntity, LoanHistoryEntity, LoanTypeEntity } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(LoanEntity)
    private readonly loanModel: typeof LoanEntity,

    @InjectModel(LoanHistoryEntity)
    private readonly historyModel: typeof LoanHistoryEntity,

    @InjectModel(LoanTypeEntity)
    private readonly loanTypeModel: typeof LoanTypeEntity,
  ) {}

  async createLoan(dto: CreateLoanDto): Promise<LoanDetailDto> {
    const loan = await this.loanModel.create(dto as any);
    const result = await this.loanModel.findByPk(loan.id, {
      include: [{ model: this.loanTypeModel }],
    });
    return result as LoanDetailDto;
  }

  async getAllLoans(): Promise<LoanListItemDto[]> {
    const loans = await this.loanModel.findAll();
    return loans.map((item) => plainToInstance(LoanListItemDto, item.toJSON()));
  }

  async getLoanById(id: string): Promise<LoanDetailDto> {
    const loan = await this.loanModel.findByPk(id, {
      include: [{ model: this.loanTypeModel }],
    });

    if (!loan) {
      throw new NotFoundException('Khoản vay không tồn tại');
    }

    return plainToInstance(LoanDetailDto, loan.toJSON());
  }

  async deleteLoan(id: string): Promise<void> {
    const loan = await this.loanModel.findByPk(id);
    if (!loan) throw new NotFoundException('Khoản vay không tồn tại');
    await loan.destroy();
  }

  async getLoanHistory(loanId: string): Promise<LoanHistoryEntity[]> {
    const histories = await this.historyModel.findAll({
      where: { loanId },
      order: [['dueDate', 'ASC']],
    });
    return histories;
  }
}
