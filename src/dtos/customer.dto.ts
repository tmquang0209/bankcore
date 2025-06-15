import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Tên của khách hàng',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tên đăng nhập của khách hàng',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email của khách hàng',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của khách hàng',
    example: '0123456789',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Địa chỉ của khách hàng',
    example: '123 Main St, City, Country',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'ID công dân của khách hàng',
    example: '987654321',
  })
  @IsOptional()
  @IsString()
  citizenId?: string;

  @ApiProperty({
    description: 'Mật khẩu của khách hàng',
    example: 'StrongPassword123!',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiProperty({
    description: 'ID của khách hàng',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}

export class BasicCustomerInfoDto {
  @ApiProperty({
    description: 'ID của khách hàng',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Tên của khách hàng',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email của khách hàng',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của khách hàng',
    example: '0123456789',
  })
  phone: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của khách hàng',
    example: true,
  })
  status: boolean;
}
