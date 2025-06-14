import { BaseEntity } from '@common/database';
import { ESystemLogAction } from '@common/enums';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EmployeeEntity } from './employee.entity';

@Table({ tableName: 'nhat_ky_he_thong', timestamps: true })
export class SystemLogEntity extends BaseEntity<SystemLogEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_hoat_dong',
    type: DataType.UUID,
    allowNull: false,
    comment: 'Mã hoạt động',
  })
  declare activityId: string;

  @ForeignKey(() => EmployeeEntity)
  @Column({
    field: 'ma_nhan_vien',
    type: DataType.UUID,
    allowNull: false,
    comment: 'Mã nhân viên thực hiện hoạt động',
  })
  declare employeeId: string;

  @Column({
    field: 'hanh_dong',
    type: DataType.ENUM(...Object.values(ESystemLogAction)),
    allowNull: false,
    comment: 'Hành động thực hiện',
  })
  declare action: ESystemLogAction;

  @Column({
    field: 'thoi_gian',
    type: DataType.DATE,
    allowNull: false,
    comment: 'Thời gian thực hiện hành động',
  })
  declare timestamp: Date;

  @Column({
    field: 'dia_chi_ip',
    type: DataType.STRING(45),
    allowNull: true,
    comment: 'Địa chỉ IP của người dùng thực hiện hành động',
  })
  declare ipAddress?: string;

  @BelongsTo(() => EmployeeEntity, {
    foreignKey: 'employeeId',
    targetKey: 'id',
  })
  employee: EmployeeEntity;
}
