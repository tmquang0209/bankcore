import { BaseEntity } from '@common/database';
import {
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { LoanEntity } from './loan.entity';
@Table({ tableName: 'lich_tra_khoan_vay', timestamps: false })
export class LoanHistoryEntity extends BaseEntity<LoanHistoryEntity> {
  @PrimaryKey
  @Column({ field: 'ma_tra', type: DataType.STRING, primaryKey: true })
  declare id: string;

  @ForeignKey(() => LoanEntity)
  @Column({ field: 'ma_khoan_vay', type: DataType.STRING, allowNull: false })
  loanId: string;

  @Column({ field: 'ngay_dao_han', type: DataType.DATEONLY, allowNull: false })
  dueDate: Date;

  @Column({
    field: 'so_tien_phai_tra',
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  amountDue: number;

  @Column({
    field: 'so_tien_da_tra',
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  amountPaid: number;

  @Column({
    field: 'ngay_thanh_toan',
    type: DataType.DATEONLY,
    allowNull: true,
  })
  paymentDate?: Date;

  @Column({
    field: 'trang_thai',
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
