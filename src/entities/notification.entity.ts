import { BaseEntity } from '@common/database';
import { AccountEntity, EmployeeEntity } from '@entities';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({ tableName: 'thong_bao', timestamps: false })
export class NotificationEntity extends BaseEntity<NotificationEntity> {
  @PrimaryKey
  @Column({ field: 'ma_thong_bao', type: DataType.STRING, primaryKey: true })
  declare id: string;

  @ForeignKey(() => AccountEntity)
  @Column({ field: 'ma_tai_khoan', type: DataType.UUID, allowNull: false })
  accountId: string;

  @ForeignKey(() => EmployeeEntity)
  @Column({ field: 'ma_nhan_vien', type: DataType.UUID, allowNull: true })
  employeeId?: string;

  @Column({ field: 'tieu_de', type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ field: 'noi_dung', type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ field: 'da_doc', type: DataType.BOOLEAN, defaultValue: false })
  isRead?: boolean;

  @BelongsTo(() => AccountEntity, {
    foreignKey: 'accountId',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account?: AccountEntity;

  @BelongsTo(() => EmployeeEntity, {
    foreignKey: 'employeeId',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  employee?: EmployeeEntity;
}
