import { BaseEntity } from '@common/database';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'tien_te', timestamps: true })
export class CurrencyEntity extends BaseEntity<CurrencyEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_tien_te',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    field: 'ten_tien_te',
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    field: 'ky_hieu',
    type: DataType.STRING(10),
    allowNull: false,
  })
  declare symbol: string;

  @Column({
    field: 'ty_gia',
    type: DataType.DECIMAL(18, 6),
    allowNull: false,
  })
  declare exchangeRate: number;
}
