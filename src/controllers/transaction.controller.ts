import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseMessage } from '@common/decorators';
import {
  CreateTransactionDto,
  TransactionDetailDto,
  TransactionListItemDto,
} from '@dto/transaction.dto';
import { TransactionService } from '@services';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo giao dịch mới' })
  @ApiResponse({
    status: 201,
    description: 'Giao dịch được tạo thành công',
    type: TransactionDetailDto,
  })
  @ResponseMessage('Tạo giao dịch thành công!')
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả giao dịch' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách giao dịch',
    type: [TransactionListItemDto],
  })
  @ResponseMessage('Lấy danh sách giao dịch thành công!')
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết giao dịch theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết giao dịch',
    type: TransactionDetailDto,
  })
  @ResponseMessage('Lấy chi tiết giao dịch thành công!')
  findOne(@Param('id') id: string) {
    return this.transactionService.findById(id);
  }
}
