import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseMessage } from '@common/decorators';
import {
  BankAccountDetailDto,
  BankAccountListItemDto,
  CreateBankAccountDto,
  UpdateBankAccountDto,
} from '@dto';
import { AccountService } from '@services';

@ApiTags('Bank Accounts')
@ApiBearerAuth()
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo tài khoản ngân hàng mới' })
  @ApiResponse({
    status: 201,
    description: 'Tài khoản được tạo thành công',
    type: BankAccountDetailDto,
  })
  @ResponseMessage('Tạo tài khoản thành công!')
  create(@Body() dto: CreateBankAccountDto) {
    return this.accountService.createAccount(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả tài khoản ngân hàng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tài khoản ngân hàng',
    type: [BankAccountListItemDto],
  })
  @ResponseMessage('Lấy danh sách tài khoản thành công!')
  findAll() {
    return this.accountService.getAllAccounts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết tài khoản ngân hàng theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết tài khoản ngân hàng',
    type: BankAccountDetailDto,
  })
  @ResponseMessage('Lấy chi tiết tài khoản thành công!')
  findOne(@Param('id') id: string) {
    return this.accountService.getAccountById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin tài khoản ngân hàng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin tài khoản đã được cập nhật',
    type: BankAccountDetailDto,
  })
  @ResponseMessage('Cập nhật tài khoản thành công!')
  update(@Param('id') id: string, @Body() dto: UpdateBankAccountDto) {
    return this.accountService.updateAccount(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Đóng (vô hiệu hoá) tài khoản ngân hàng' })
  @ApiResponse({
    status: 200,
    description: 'Tài khoản đã được đóng thành công',
  })
  @ResponseMessage('Đóng tài khoản thành công!')
  close(@Param('id') id: string) {
    return this.accountService.closeAccount(id);
  }
}
