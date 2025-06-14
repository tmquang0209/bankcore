// Table LoaiThe {
//   MaLoaiThe varchar [pk]
//   TenLoaiThe varchar
//   MoTa text
// }

import { BaseEntity } from '@common/database';
import {
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CardEntity } from './card.entity';

@Table({ tableName: 'loai_the', timestamps: false })
export class CardTypeEntity extends BaseEntity<CardTypeEntity> {
  @PrimaryKey
  @Column({ field: 'ma_loai_the', type: DataType.STRING, primaryKey: true })
  declare id: string;

  @Column({ field: 'ten_loai_the', type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ field: 'mo_ta', type: DataType.TEXT, allowNull: true })
  description?: string;

  @HasMany(() => CardEntity, {
    foreignKey: 'cardTypeId',
    sourceKey: 'id',
  })
  cards?: CardEntity[];
}
