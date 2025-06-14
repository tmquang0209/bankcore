import { EGender } from '@common/enums';
import { PaginationDto } from '@dto';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly gender: EGender;

  @IsOptional()
  @IsUUID()
  readonly roleId: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword: string;

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
  @IsOptional()
  @IsString()
  readonly keywords: string;

  @IsOptional()
  @IsBoolean()
  readonly status: boolean;

  @IsOptional()
  @IsBoolean()
  readonly checkInStatus: boolean;

  @IsOptional()
  readonly projectIds: string[];

  @IsOptional()
  @IsString()
  readonly role: string;
}
