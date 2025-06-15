import { EGender } from '@common/enums';
import { PaginationDto } from '@dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Tên người dùng',
    example: 'Nguyen Van A',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'nguyenvana@example.com',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  readonly email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'StrongPassword123!',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Số điện thoại của người dùng',
    example: '0123456789',
  })
  @IsString()
  readonly phone: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của người dùng',
    example: EGender.MALE,
    type: 'string',
    enum: EGender,
  })
  @IsOptional()
  @IsString()
  readonly gender: EGender;

  @ApiProperty({
    description: 'ID vai trò của người dùng',
    example: 'd3b3f3c2-5c5e-4f5e-8f5e-5f5e5f5e5f5e',
  })
  @IsOptional()
  @IsUUID()
  readonly roleId: string;
}

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'ID của người dùng',
    example: 'd3b3f3c2-5c5e-4f5e-8f5e-5f5e5f5e5f5e',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Mật khẩu cũ của người dùng',
    example: 'OldPassword123!',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword: string;

  @ApiProperty({
    description: 'Mật khẩu mới của người dùng',
    example: 'NewPassword123!',
  })
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @IsString({ message: 'Mật khẩu mới phải là chuỗi ký tự' })
  @MinLength(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt (!,@,#,$,%,...)',
    },
  )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  newPassword: string;
}

export class UserListDto extends PaginationDto {
  @ApiProperty({
    description: 'Từ khóa tìm kiếm người dùng',
    example: 'Nguyen Van A',
  })
  @IsOptional()
  @IsString()
  readonly keywords: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của người dùng',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  readonly role: string;
}
