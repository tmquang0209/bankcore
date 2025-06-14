// Table NhatKyKhachHang {
//   MaNhatKy varchar [pk]
//   MaKhachHang varchar [ref: > KhachHang.MaKhachHang]
//   HanhDong text
//   ThoiGian datetime
//   DiaChiIP varchar
// }

import { BaseEntity } from '@common/database';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'nhat_ky_khach_hang', timestamps: true })
export class CustomerLogEntity extends BaseEntity<CustomerLogEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_nhat_ky',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    field: 'ma_khach_hang',
    type: DataType.UUID,
    allowNull: false,
  })
  customerId: string;

  @Column({
    field: 'hanh_dong',
    type: DataType.TEXT,
    allowNull: false,
  })
  action: string;

  @Column({
    field: 'thoi_gian',
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp: Date;

  @Column({
    field: 'dia_chi_ip',
    type: DataType.STRING,
    allowNull: true,
  })
  ipAddress: string;
}
