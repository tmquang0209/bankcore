import { BaseEntity } from '@common/database';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Table({ tableName: 'vai_tro_quyen_han', timestamps: false })
export class RolePermissionsEntity extends BaseEntity<RolePermissionsEntity> {
  @ForeignKey(() => RoleEntity)
  @Column({ field: 'ma_vai_tro', type: DataType.UUID, allowNull: false })
  declare roleId: string;

  @ForeignKey(() => PermissionEntity)
  @Column({
    field: 'ma_quyen_han',
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare permissionId: string;

  @BelongsTo(() => RoleEntity, {
    foreignKey: 'roleId',
    targetKey: 'id',
  })
  role: RoleEntity;

  @BelongsTo(() => PermissionEntity, {
    foreignKey: 'permissionId',
    targetKey: 'id',
  })
  permission: PermissionEntity;
}
