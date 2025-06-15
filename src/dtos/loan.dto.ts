import { ELoanStatus } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

// 🏦 DTO tạo khoản vay
export class CreateLoanDto {
  @ApiProperty({
    description: 'ID của tài khoản người vay',
    example: '3f8a5f9b-d50b-4a77-b282-22a3a2056e7f',
  })
  @IsUUID()
  accountId: string;

  @ApiProperty({
    description: 'ID của loại vay',
    example: 'LOAN_TYPE_01',
  })
  @IsString()
  loanTypeId: string;

  @ApiProperty({
    description: 'ID của nhân viên thực hiện khoản vay',
    example: '1a23bc45-d67e-8910-f123-456789abcdef',
  })
  @IsUUID()
  employeeId: string;

  @ApiProperty({
    description: 'Số tiền vay (VNĐ)',
    example: 10000000,
  })
  @IsNumber()
  loanAmount: number;

  @ApiProperty({
    description: 'Thời hạn vay tính theo số tháng',
    example: 12,
  })
  @IsInt()
  @Min(1)
  termMonths: number;

  @ApiProperty({
    description: 'Lãi suất mỗi tháng (phần trăm)',
    example: 1.5,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  interestRate: number;

  @ApiProperty({
    description: 'Ngày bắt đầu vay (YYYY-MM-DD)',
    example: '2025-06-01',
  })
  @IsDateString()
  loanDate: Date;

  @ApiProperty({
    description: 'Trạng thái khoản vay',
    enum: ELoanStatus,
    example: ELoanStatus.ACTIVE,
  })
  @IsEnum(ELoanStatus)
  status: ELoanStatus;
}

// 📄 DTO loại vay (dùng để lồng trong LoanDetailDto)
export class LoanTypeDto {
  @ApiProperty({
    description: 'ID loại vay',
    example: 'LOAN_TYPE_01',
  })
  id: string;

  @ApiProperty({
    description: 'Tên loại vay',
    example: 'Vay mua nhà',
  })
  name: string;

  @ApiProperty({
    description: 'Lãi suất mặc định (%) cho loại vay này',
    example: 1.2,
  })
  defaultInterestRate: number;

  @ApiProperty({
    description: 'Mô tả thêm về loại vay',
    example: 'Dành cho khách hàng vay mua nhà với lãi suất ưu đãi',
    required: false,
  })
  description?: string;
}

// 📃 DTO chi tiết khoản vay
export class LoanDetailDto {
  @ApiProperty({
    description: 'ID khoản vay',
    example: 'LOAN_20250601_001',
  })
  id: string;

  @ApiProperty({
    description: 'ID tài khoản người vay',
    example: '3f8a5f9b-d50b-4a77-b282-22a3a2056e7f',
  })
  accountId: string;

  @ApiProperty({
    description: 'ID loại vay',
    example: 'LOAN_TYPE_01',
  })
  loanTypeId: string;

  @ApiProperty({
    description: 'ID nhân viên tạo khoản vay',
    example: '1a23bc45-d67e-8910-f123-456789abcdef',
  })
  employeeId: string;

  @ApiProperty({
    description: 'Số tiền đã vay',
    example: 10000000,
  })
  loanAmount: number;

  @ApiProperty({
    description: 'Thời hạn vay (tháng)',
    example: 12,
  })
  termMonths: number;

  @ApiProperty({
    description: 'Lãi suất tính theo phần trăm',
    example: 1.5,
  })
  interestRate: number;

  @ApiProperty({
    description: 'Ngày vay',
    example: '2025-06-01',
  })
  loanDate: Date;

  @ApiProperty({
    description: 'Trạng thái khoản vay',
    enum: ELoanStatus,
    example: ELoanStatus.ACTIVE,
  })
  status: ELoanStatus;

  @ApiProperty({
    type: () => LoanTypeDto,
    description: 'Thông tin loại vay liên kết',
    required: false,
  })
  loanType?: LoanTypeDto;
}

// 📋 DTO danh sách khoản vay (tối giản)
export class LoanListItemDto {
  @ApiProperty({
    description: 'ID khoản vay',
    example: 'LOAN_20250601_001',
  })
  id: string;

  @ApiProperty({
    description: 'ID tài khoản người vay',
    example: '3f8a5f9b-d50b-4a77-b282-22a3a2056e7f',
  })
  accountId: string;

  @ApiProperty({
    description: 'ID loại vay',
    example: 'LOAN_TYPE_01',
  })
  loanTypeId: string;

  @ApiProperty({
    description: 'Số tiền đã vay',
    example: 10000000,
  })
  loanAmount: number;

  @ApiProperty({
    description: 'Thời hạn vay (tháng)',
    example: 12,
  })
  termMonths: number;

  @ApiProperty({
    description: 'Ngày vay',
    example: '2025-06-01',
  })
  loanDate: Date;

  @ApiProperty({
    description: 'Trạng thái khoản vay',
    enum: ELoanStatus,
    example: ELoanStatus.ACTIVE,
  })
  status: ELoanStatus;
}
