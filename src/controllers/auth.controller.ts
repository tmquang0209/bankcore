// auth.controller.ts
import { ResponseMessage } from '@common/decorators';
import { AllowUnauthorized } from '@common/decorators/allow-unauthorized.decorator';
import { RefreshTokenGuard } from '@common/guards';
import { BasicInfoDto, ForgotPasswordDto, LoginDto } from '@dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService, RoleService } from '@services';

@ApiTags('Auth')
@AllowUnauthorized()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @Post('login')
  @ResponseMessage('Đăng nhập thành công!')
  @ApiOperation({ summary: 'Đăng nhập nhân viên' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công!',
    type: BasicInfoDto,
  })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
  login(@Body() params: LoginDto) {
    return this.authService.login(params);
  }

  // @Post('register')
  // async register(@Body() params: RegisterDto) {
  //   await this.mailService.sendWelcomeEmail(params.email, params.fullName);
  //   return { message: 'Đăng ký hoàn tất' };
  // }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ResponseMessage('Làm mới token thành công!')
  @ApiOperation({ summary: 'Làm mới access token bằng refresh token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Làm mới access token thành công!',
    type: BasicInfoDto,
  })
  @ApiResponse({ status: 401, description: 'Không được phép' })
  refresh(@Req() req: Request) {
    const { sub, refreshToken } = req['user'];
    return this.authService.refreshToken(sub as string, refreshToken as string);
  }

  @Post('forgot-password')
  @ResponseMessage('Đã gửi email đặt lại mật khẩu!')
  @ApiOperation({ summary: 'Yêu cầu gửi email đặt lại mật khẩu' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Đã gửi email đặt lại mật khẩu!',
    schema: { properties: { success: { type: 'boolean' } } },
  })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
  async forgotPassword(@Body() params: ForgotPasswordDto) {
    return this.authService.sendNewPassword(params);
  }

  @Get('roles/:roleId')
  @ResponseMessage('Lấy thông tin vai trò thành công!')
  @ApiOperation({ summary: 'Lấy vai trò theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin vai trò thành công!',
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy vai trò' })
  getRoleById(@Param('roleId') roleId: string) {
    return this.roleService.findById(roleId);
  }

  @Post('customer/login')
  @ResponseMessage('Đăng nhập khách hàng thành công!')
  @ApiOperation({ summary: 'Đăng nhập khách hàng' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập khách hàng thành công!',
    type: BasicInfoDto,
  })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
  loginCustomer(@Body() params: LoginDto) {
    return this.authService.loginCustomer(params);
  }
}
