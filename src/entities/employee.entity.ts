import { BaseEntity } from '@common/database';
import { EGender } from '@common/enums';
import * as bcrypt from 'bcryptjs';
import {
  BeforeBulkCreate,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoleEntity } from './role.entity';
import { SystemLogEntity } from './system-log.entity';

@Table({ tableName: 'nhan_vien', timestamps: true })
export class EmployeeEntity extends BaseEntity<EmployeeEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_nhan_vien',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ field: 'ho_ten', type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ field: 'email', type: DataType.STRING(255), allowNull: false })
  declare email: string;

  @Column({
    field: 'gioi_tinh',
    type: DataType.ENUM(...Object.values(EGender)),
    defaultValue: EGender.OTHER,
    allowNull: false,
  })
  declare gender: EGender;

  @Column({
    field: 'so_dien_thoai',
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'ten_dang_nhap',
    comment: 'Tên đăng nhập',
  })
  declare username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'mat_khau',
    comment: 'Mật khẩu',
  })
  declare password: string;

  @ForeignKey(() => RoleEntity)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'ma_vai_tro',
    comment: 'Mã vai trò',
  })
  declare roleId: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'refresh_token',
    comment: 'Refresh token',
  })
  declare refreshToken?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'trang_thai',
    comment: 'Trạng thái tài khoản',
  })
  declare status: boolean;

  @BelongsTo(() => RoleEntity, 'roleId')
  declare role: RoleEntity;

  @HasMany(() => SystemLogEntity, {
    foreignKey: 'employeeId',
    sourceKey: 'id',
  })
  systemLogs: SystemLogEntity[];

  @BeforeCreate
  static async hashPassword(user: EmployeeEntity) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeUpdate
  static async hashPasswordUpdate(user: EmployeeEntity) {
    if (user.changed('password') && user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeBulkCreate
  static async hashBulkPasswords(users: EmployeeEntity[]) {
    for (const user of users) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
}
