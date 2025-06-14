import { BaseEntity } from '@common/database';
import { EGender } from '@common/enums';
import { AccountEntity, CustomerLogEntity } from '@entities';
import * as bcrypt from 'bcryptjs';
import {
  BeforeBulkCreate,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'khach_hang', timestamps: true })
export class CustomerEntity extends BaseEntity<CustomerEntity> {
  @PrimaryKey
  @Column({
    field: 'ma_khach_hang',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    field: 'ho_ten',
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    field: 'email',
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    field: 'gioi_tinh',
    type: DataType.ENUM(...Object.values(EGender)),
    allowNull: true,
    defaultValue: EGender.OTHER,
  })
  gender: EGender;

  @Column({
    field: 'so_dien_thoai',
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    field: 'dia_chi',
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    field: 'cccd',
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  citizenId: string;

  @Column({
    field: 'ngay_dang_ky',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  registrationDate: Date;

  @Column({
    field: 'ten_dang_nhap',
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'mat_khau',
    comment: 'Mật khẩu',
  })
  declare password: string;

  @Column({
    field: 'trang_thai',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  status: boolean;

  @HasMany(() => CustomerLogEntity, {
    foreignKey: 'customerId',
    sourceKey: 'id',
  })
  logs: CustomerLogEntity[];

  @HasMany(() => AccountEntity, {
    foreignKey: 'customerId',
    sourceKey: 'id',
  })
  accounts: AccountEntity[];

  @BeforeCreate
  static async hashPassword(user: CustomerEntity) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeUpdate
  static async hashPasswordUpdate(user: CustomerEntity) {
    if (user.changed('password') && user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeBulkCreate
  static async hashBulkPasswords(users: CustomerEntity[]) {
    for (const user of users) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
}
