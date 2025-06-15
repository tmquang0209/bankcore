import { BaseEntity } from '@common/database';
import { EAccountStatus } from '@common/enums';
import { AccountTypeEntity, CustomerEntity } from '@entities';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'tai_khoan', timestamps: true })
export class AccountEntity extends BaseEntity<AccountEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_tai_khoan',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => CustomerEntity)
  @Column({
    field: 'ma_khach_hang',
    type: DataType.UUID,
    allowNull: false,
  })
  customerId: string;

  @ForeignKey(() => AccountTypeEntity)
  @Column({
    field: 'ma_loai_tai_khoan',
    type: DataType.UUID,
    allowNull: false,
  })
  accountTypeId: string;

  @Column({
    field: 'so_tai_khoan',
    type: DataType.STRING(50),
    allowNull: false,
  })
  accountNumber: string;

  @Column({
    field: 'so_du',
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  balance: number;

  @Column({
    field: 'ma_tien_te',
    type: DataType.UUID,
    allowNull: false,
  })
  currencyId: string;

  @Column({
    field: 'ngay_mo_tai_khoan',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare openingDate: Date;

  @Column({
    field: 'trang_thai',
    type: DataType.ENUM(...Object.values(EAccountStatus)),
    allowNull: false,
    defaultValue: EAccountStatus.ACTIVE,
  })
  status: EAccountStatus;

  @BelongsTo(() => CustomerEntity)
  customer: CustomerEntity;

  @BelongsTo(() => AccountTypeEntity, {
    foreignKey: 'accountTypeId',
    targetKey: 'id',
  })
  accountType: AccountTypeEntity;
}
