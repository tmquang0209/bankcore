// employee.controller.ts
import { Permissions, ResponseMessage } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import {
  BasicInfoDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from '@dto';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeService } from '@services';

@ApiTags('Employees')
@ApiBearerAuth()
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('info')
  @ResponseMessage('Get employee info success!')
  @ApiOperation({ summary: 'Lấy thông tin nhân viên hiện tại' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin nhân viên thành công!',
    type: BasicInfoDto,
  })
  @ApiResponse({ status: 401, description: 'Không được ủy quyền' })
  getUserInfo(@Req() req: Request) {
    const { id: userId } = req['user'] as BasicInfoDto;
    return this.employeeService.getUserById(userId);
  }

  @Post()
  @ResponseMessage('Create employee success!')
  @Permissions(PermissionKeys.USER_CREATE)
  @ApiOperation({ summary: 'Tạo nhân viên mới' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo nhân viên thành công!',
    schema: {
      properties: {
        id: { type: 'string' },
        fullName: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
  @ApiResponse({ status: 409, description: 'Email đã tồn tại' })
  @ApiResponse({ status: 403, description: 'Không có quyền' })
  createUser(@Body() params: CreateUserDto) {
    return this.employeeService.createUser(params);
  }

  @Post('get-list')
  @ResponseMessage('Get employee list success!')
  @Permissions(PermissionKeys.USER_READ)
  @ApiOperation({ summary: 'Lấy danh sách tất cả nhân viên' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách nhân viên thành công!',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'string' },
          fullName: { type: 'string' },
          email: { type: 'string' },
          role: {
            properties: {
              id: { type: 'string' },
              roleName: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Không có quyền' })
  getListUsers() {
    return this.employeeService.getListUsers();
  }

  @Put('update')
  @ResponseMessage('Update employee info success!')
  @Permissions(PermissionKeys.USER_UPDATE)
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin nhân viên thành công!',
    type: BasicInfoDto,
  })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  @ApiResponse({ status: 403, description: 'Không có quyền' })
  updateUser(@Req() req: Request, @Body() params: UpdateUserDto) {
    const { id } = req['user'] as BasicInfoDto;
    return this.employeeService.updateUser({ ...params, id });
  }

  @Post('change-password')
  @ResponseMessage('Change password success!')
  @ApiOperation({ summary: 'Đổi mật khẩu của người dùng hiện tại' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Đổi mật khẩu thành công!',
    schema: { properties: { message: { type: 'string' } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Mật khẩu cũ không chính xác hoặc yêu cầu không hợp lệ',
  })
  @ApiResponse({ status: 401, description: 'Không được ủy quyền' })
  changePassword(@Body() params: ChangePasswordDto, @Req() req: Request) {
    const { id: userId } = req['user'] as BasicInfoDto;
    return this.employeeService.changePassword(params, userId);
  }

  @Get(':id/details')
  @ResponseMessage('Get user info success!')
  @Permissions(PermissionKeys.USER_READ)
  @ApiOperation({ summary: 'Lấy thông tin chi tiết của nhân viên theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin người dùng thành công!',
    type: BasicInfoDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  @ApiResponse({ status: 403, description: 'Không có quyền' })
  getDetailUser(@Param('id') id: string) {
    return this.employeeService.getUserById(id);
  }
}
