import { ResponseMessage } from '@common/decorators';
import { CreateLoanDto, LoanDetailDto, LoanListItemDto } from '@dto';
import { LoanHistoryEntity } from '@entities';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoanService } from '@services';

@ApiTags('Loans')
@ApiBearerAuth()
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo khoản vay mới' })
  @ApiResponse({
    status: 201,
    description: 'Khoản vay được tạo thành công',
    type: LoanDetailDto,
  })
  @ResponseMessage('Tạo khoản vay thành công!')
  create(@Body() dto: CreateLoanDto) {
    return this.loanService.createLoan(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả khoản vay' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách khoản vay',
    type: [LoanListItemDto],
  })
  @ResponseMessage('Lấy danh sách khoản vay thành công!')
  findAll() {
    return this.loanService.getAllLoans();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết khoản vay theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết khoản vay',
    type: LoanDetailDto,
  })
  @ResponseMessage('Lấy chi tiết khoản vay thành công!')
  findOne(@Param('id') id: string) {
    return this.loanService.getLoanById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá khoản vay' })
  @ApiResponse({ status: 200, description: 'Khoản vay đã được xoá thành công' })
  @ResponseMessage('Xoá khoản vay thành công!')
  remove(@Param('id') id: string) {
    return this.loanService.deleteLoan(id);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Lấy lịch trả nợ của khoản vay' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách lịch trả nợ',
    type: [LoanHistoryEntity],
  })
  @ResponseMessage('Lấy lịch trả nợ thành công!')
  getLoanHistory(@Param('id') loanId: string) {
    return this.loanService.getLoanHistory(loanId);
  }
}
