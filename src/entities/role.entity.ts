// role.entity.ts
import { BaseEntity } from '@common/database';
import { ConflictException } from '@nestjs/common';
import {
  BeforeCreate,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PermissionEntity } from './permission.entity';
import { RolePermissionsEntity } from './role-permissions.entity';

@Table({ tableName: 'vai_tro', timestamps: true })
export class RoleEntity extends BaseEntity<RoleEntity> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    field: 'ma_vai_tro',
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  declare code: string;

  @Column({
    field: 'ten_vai_tro',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    field: 'mo_ta_quyen_han',
    type: DataType.STRING(500),
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => RolePermissionsEntity, {
    foreignKey: 'roleId',
    sourceKey: 'code',
  })
  rolePermissions: RolePermissionsEntity[];

  // Many-to-many relationship with PermissionEntity through RolePermissionsEntity
  @BelongsToMany(() => PermissionEntity, {
    through: () => RolePermissionsEntity,
    foreignKey: 'roleId', // Foreign key in RolePermissionsEntity that refers to RoleEntity
    otherKey: 'permissionId', // Foreign key in RolePermissionsEntity that refers to PermissionEntity
  })
  permissions: PermissionEntity[];

  @BeforeCreate
  static async checkRoleName(role: RoleEntity) {
    const existingRole = await RoleEntity.findOne({
      where: { name: role.name },
    });
    if (existingRole) {
      throw new ConflictException('Vai trò với tên này đã tồn tại.');
    }
  }
}
