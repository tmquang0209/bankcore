import { Permissions, ResponseMessage } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import {
  BasicCustomerInfoDto,
  ChangePasswordDto,
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@dto';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerService } from '@services';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('info')
  @ResponseMessage('Get customer info success!')
  @ApiOperation({ summary: 'Lấy thông tin khách hàng hiện tại' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin khách hàng thành công!',
    type: BasicCustomerInfoDto,
  })
  getCustomerInfo(@Req() req: Request) {
    const { id: userId } = req['user'] as BasicCustomerInfoDto;
    return this.customerService.getCustomerById(userId);
  }

  @Post()
  @ResponseMessage('Create customer success!')
  @ApiOperation({ summary: 'Tạo khách hàng mới' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo khách hàng thành công!',
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Email hoặc username đã tồn tại' })
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.customerService.createUser(dto);
  }

  @Post('get-list')
  @ResponseMessage('Get customer list success!')
  @Permissions(PermissionKeys.USER_READ)
  @ApiOperation({ summary: 'Lấy danh sách tất cả khách hàng' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách khách hàng thành công!',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
        },
      },
    },
  })
  getListCustomers() {
    return this.customerService.getListCustomers();
  }

  @Put('update')
  @ResponseMessage('Update customer info success!')
  @Permissions(PermissionKeys.USER_UPDATE)
  @ApiOperation({ summary: 'Cập nhật thông tin khách hàng' })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin khách hàng thành công!',
    type: BasicCustomerInfoDto,
  })
  updateCustomer(@Req() req: Request, @Body() dto: UpdateCustomerDto) {
    const { id } = req['user'] as BasicCustomerInfoDto;
    return this.customerService.updateUser({ ...dto, id });
  }

  @Post('change-password')
  @ResponseMessage('Change customer password success!')
  @ApiOperation({ summary: 'Đổi mật khẩu của khách hàng hiện tại' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Đổi mật khẩu thành công!',
    schema: { properties: { message: { type: 'string' } } },
  })
  @ApiResponse({
    status: 400,
    description: 'Mật khẩu cũ không đúng hoặc không hợp lệ',
  })
  changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request) {
    const { id } = req['user'] as BasicCustomerInfoDto;
    return this.customerService.changePassword(dto, id);
  }

  @Get(':id/details')
  @ResponseMessage('Get customer detail success!')
  @Permissions(PermissionKeys.USER_READ)
  @ApiOperation({ summary: 'Lấy thông tin chi tiết của khách hàng theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin khách hàng thành công!',
    type: BasicCustomerInfoDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khách hàng' })
  getCustomerDetails(@Param('id') id: string) {
    return this.customerService.getCustomerById(id);
  }
}
