import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })
  @IsNotEmpty({ message: 'Email là bắt buộc' })
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'StrongPassword123',
    minLength: 6,
  })
  @IsString({ message: 'Mật khẩu phải là một chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Địa chỉ email để gửi liên kết đặt lại mật khẩu',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })
  @IsNotEmpty({ message: 'Email là bắt buộc' })
  email: string;
}

export class BasicInfoDto {
  @ApiProperty({
    description: 'Access token cho các yêu cầu đã xác thực',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly accessToken: string;
  @ApiProperty({
    description: 'Refresh token để lấy access token mới',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly refreshToken: string;
  @ApiProperty({
    description: 'ID người dùng',
    example: '1234567890abcdef',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Tên người dùng',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'user@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Số điện thoại người dùng',
    example: '123-456-7890',
  })
  readonly phone: string;

  @ApiProperty({
    description: 'Trạng thái người dùng',
    example: true,
  })
  readonly status: boolean;

  @ApiProperty({
    description: 'Vai trò người dùng',
    type: () => ({
      id: { type: 'string', example: 'role123' },
      name: { type: 'string', example: 'Admin' },
      code: { type: 'string', example: 'ADMIN' },
      permissions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'perm123' },
            name: { type: 'string', example: 'Quản lý người dùng' },
            code: { type: 'string', example: 'USER_MANAGE' },
          },
        },
      },
    }),
  })
  readonly role?: {
    id: string;
    name: string;
    code: string;
    permissions: {
      id: string;
      name: string;
      code: string;
    }[];
  };
}

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'Access token mới',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
