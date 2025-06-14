// Table The {
//   MaThe varchar [pk]
//   MaTaiKhoan varchar [ref: > TaiKhoan.MaTaiKhoan]
//   MaLoaiThe varchar [ref: > LoaiThe.MaLoaiThe]
//   SoThe varchar
//   CCV varchar(3)
//   TinhTrang varchar
//   NgayPhatHanh date
//   NgayHetHan date
// }
import { BaseEntity } from '@common/database';
import { AccountEntity, CardTypeEntity } from '@entities';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'the', timestamps: false })
export class CardEntity extends BaseEntity<CardEntity> {
  @PrimaryKey
  @Column({ field: 'ma_the', type: DataType.STRING, primaryKey: true })
  declare id: string;

  @ForeignKey(() => AccountEntity)
  @Column({ field: 'ma_tai_khoan', type: DataType.UUID, allowNull: false })
  accountId: string;

  @ForeignKey(() => CardTypeEntity)
  @Column({ field: 'ma_loai_the', type: DataType.STRING, allowNull: false })
  cardTypeId: string;

  @Column({ field: 'so_the', type: DataType.STRING, allowNull: false })
  cardNumber: string;

  @Column({ field: 'ccv', type: DataType.STRING(3), allowNull: false })
  ccv: string;

  @Column({ field: 'tinh_trang', type: DataType.STRING, allowNull: false })
  status: string;

  @Column({
    field: 'ngay_phat_hanh',
    type: DataType.DATEONLY,
    allowNull: false,
  })
  issueDate: Date;

  @Column({
    field: 'ngay_het_han',
    type: DataType.DATEONLY,
    allowNull: false,
  })
  expirationDate: Date;

  @BelongsTo(() => AccountEntity, {
    foreignKey: 'accountId',
    targetKey: 'id',
  })
  account?: AccountEntity;

  @BelongsTo(() => CardTypeEntity, {
    foreignKey: 'cardTypeId',
    targetKey: 'id',
  })
  cardType?: CardTypeEntity;
}
