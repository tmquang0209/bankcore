import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class BasicInfoDto {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly status: boolean;
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
  accessToken: string;
}
