import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'ID tài khoản thực hiện giao dịch' })
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({ description: 'ID loại giao dịch' })
  @IsUUID()
  @IsNotEmpty()
  transactionTypeId: string;

  @ApiProperty({ description: 'ID nhân viên thực hiện giao dịch' })
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ description: 'Số tiền giao dịch' })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'ID người nhận', required: false })
  @IsString()
  receiverId: string;

  @ApiProperty({ description: 'Mô tả giao dịch', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class TransactionDetailDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  transactionTypeId: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  transactionTime: Date;

  @ApiProperty({ type: () => Object, required: false })
  account?: any;

  @ApiProperty({ type: () => Object, required: false })
  transactionType?: any;

  @ApiProperty({ type: () => Object, required: false })
  employee?: any;
}

export class TransactionListItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  transactionTime: Date;

  @ApiProperty()
  transactionTypeName: string;

  @ApiProperty()
  accountNumber: string;
}
