import { BaseEntity } from '@common/database';
import { ETransactionStatus } from '@common/enums';
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
import { TransactionTypeEntity } from './transaction-type.entity';
@Table({ tableName: 'giao_dich', timestamps: true })
export class TransactionEntity extends BaseEntity<TransactionEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_giao_dich',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => AccountEntity)
  @Column({
    field: 'ma_tai_khoan',
    type: DataType.UUID,
    allowNull: false,
  })
  accountId: string;

  @ForeignKey(() => AccountEntity)
  @Column({
    field: 'ma_nguoi_nhan',
    type: DataType.UUID,
    allowNull: false,
  })
  receiverId?: string;

  @ForeignKey(() => TransactionTypeEntity)
  @Column({
    field: 'ma_loai_giao_dich',
    type: DataType.UUID,
    allowNull: false,
  })
  transactionTypeId: string;

  @ForeignKey(() => EmployeeEntity)
  @Column({
    field: 'ma_nhan_vien',
    type: DataType.UUID,
    allowNull: true,
  })
  employeeId?: string;

  @Column({
    field: 'so_tien',
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    field: 'mo_ta',
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    field: 'thoi_gian_giao_dich',
    type: DataType.DATE,
    allowNull: false,
  })
  transactionTime: Date;

  @Column({
    field: 'trang_thai',
    type: DataType.ENUM(...Object.values(ETransactionStatus)),
    allowNull: false,
    defaultValue: ETransactionStatus.PENDING,
  })
  status: ETransactionStatus;

  @BelongsTo(() => AccountEntity, {
    foreignKey: 'accountId',
    targetKey: 'id',
  })
  sender: AccountEntity;

  @BelongsTo(() => AccountEntity, {
    foreignKey: 'recipientAccountId',
    targetKey: 'id',
  })
  recipient?: AccountEntity;

  @BelongsTo(() => TransactionTypeEntity, {
    foreignKey: 'transactionTypeId',
    targetKey: 'id',
  })
  transactionType: TransactionTypeEntity;

  @BelongsTo(() => EmployeeEntity, {
    foreignKey: 'employeeId',
    targetKey: 'id',
  })
  employee?: EmployeeEntity;
}
