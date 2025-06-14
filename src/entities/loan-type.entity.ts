import { BaseEntity } from '@common/database';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'loai_vay', timestamps: false })
export class LoanTypeEntity extends BaseEntity<LoanTypeEntity> {
  @PrimaryKey
  @Column({ field: 'ma_loai_vay', type: DataType.STRING, primaryKey: true })
  declare id: string;

  @Column({ field: 'ten_loai_vay', type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({
    field: 'lai_suat_mac_dinh',
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare defaultInterestRate: number;

  @Column({ field: 'mo_ta', type: DataType.TEXT, allowNull: true })
  declare description?: string;
}
