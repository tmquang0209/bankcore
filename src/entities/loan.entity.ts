import { BaseEntity } from '@common/database';
import { ELoanStatus } from '@common/enums';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AccountEntity } from './account.entity';
import { EmployeeEntity } from './employee.entity';
import { LoanTypeEntity } from './loan-type.entity';
@Table({ tableName: 'khoan_vay', timestamps: false })
export class LoanEntity extends BaseEntity<LoanEntity> {
  @PrimaryKey
  @Column({ field: 'ma_khoan_vay', type: DataType.STRING, primaryKey: true })
  declare id: string;

  @ForeignKey(() => AccountEntity)
  @Column({ field: 'ma_tai_khoan', type: DataType.UUID, allowNull: false })
  accountId: string;

  @ForeignKey(() => LoanTypeEntity)
  @Column({ field: 'ma_loai_vay', type: DataType.STRING, allowNull: false })
  loanTypeId: string;

  @ForeignKey(() => EmployeeEntity)
  @Column({ field: 'ma_nhan_vien', type: DataType.UUID, allowNull: false })
  employeeId: string;

  @Column({
    field: 'so_tien_vay',
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  loanAmount: number;

  @Column({ field: 'thoi_han', type: DataType.INTEGER, allowNull: false })
  termMonths: number;

  @Column({ field: 'lai_suat', type: DataType.DECIMAL(5, 2), allowNull: false })
  interestRate: number;

  @Column({ field: 'ngay_vay', type: DataType.DATEONLY, allowNull: false })
  loanDate: Date;

  @Column({
    field: 'trang_thai',
    type: DataType.ENUM(...Object.values(ELoanStatus)),
    allowNull: false,
    defaultValue: ELoanStatus.ACTIVE,
  })
  status: ELoanStatus;

  @BelongsTo(() => AccountEntity, {
    foreignKey: 'accountId',
    targetKey: 'id',
  })
  account?: AccountEntity;

  @BelongsTo(() => LoanTypeEntity, {
    foreignKey: 'loanTypeId',
    targetKey: 'id',
  })
  loanType?: LoanTypeEntity;

  @BelongsTo(() => EmployeeEntity, {
    foreignKey: 'employeeId',
    targetKey: 'id',
  })
  employee?: EmployeeEntity;
}
