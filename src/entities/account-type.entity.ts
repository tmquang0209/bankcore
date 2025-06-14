import { BaseEntity } from '@common/database';
import {
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { AccountEntity } from './account.entity';

@Table({ tableName: 'loai_tai_khoan', timestamps: true })
export class AccountTypeEntity extends BaseEntity<AccountTypeEntity> {
  @PrimaryKey
  @Column({
    field: 'id',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Unique
  @Column({
    field: 'ma_loai_tai_khoan',
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: () => 'ATK-' + Date.now(),
  })
  declare code: string;

  @Column({
    field: 'ten_loai_tai_khoan',
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    field: 'mo_ta',
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => AccountEntity, {
    foreignKey: 'accountTypeId',
    sourceKey: 'id',
  })
  accounts: AccountEntity[];
}
