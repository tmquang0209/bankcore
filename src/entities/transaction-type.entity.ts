// Table LoaiGiaoDich {
//   MaLoaiGiaoDich varchar [pk]
//   TenLoai varchar
//   MoTa text
// }
import { BaseEntity } from '@common/database';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'loai_giao_dich', timestamps: true })
export class TransactionTypeEntity extends BaseEntity<TransactionTypeEntity> {
  // Define the primary key
  @PrimaryKey
  @Column({
    field: 'ma_loai_giao_dich',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    field: 'ten_loai',
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
}
