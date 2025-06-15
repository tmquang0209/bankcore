import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { EAccountStatus } from '@common/enums';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBankAccountDto {
  @ApiProperty({ description: 'ID khách hàng' })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ description: 'ID loại tài khoản' })
  @IsUUID()
  @IsNotEmpty()
  accountTypeId: string;

  @ApiProperty({ description: 'Số tài khoản' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ description: 'ID loại tiền tệ' })
  @IsUUID()
  @IsNotEmpty()
  currencyId: string;
}

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {
  @ApiProperty({ description: 'ID tài khoản', required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ enum: EAccountStatus, required: false })
  @IsEnum(EAccountStatus)
  @IsOptional()
  status?: EAccountStatus;
}

export class BankAccountDetailDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  accountTypeId: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  currencyId: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  openingDate: Date;

  @ApiProperty({ enum: EAccountStatus })
  status: EAccountStatus;

  @ApiProperty({
    type: () => Object,
    description: 'Thông tin khách hàng',
    required: false,
  })
  customer?: any;

  @ApiProperty({
    type: () => Object,
    description: 'Loại tài khoản',
    required: false,
  })
  accountType?: any;
}

export class BankAccountListItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  accountTypeName: string;

  @ApiProperty()
  customerName: string;
}
