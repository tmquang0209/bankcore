import {
  BasicCustomerInfoDto,
  ChangePasswordDto,
  CreateCustomerDto,
  UpdateCustomerDto,
} from '@dto';
import { CustomerEntity } from '@entities';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerEntity)
    private readonly customerRepo: typeof CustomerEntity,
  ) {}

  async createUser(params: CreateCustomerDto): Promise<CustomerEntity> {
    const existing = await this.customerRepo.findOne({
      where: {
        [Op.or]: [{ email: params.email }, { username: params.username }],
      },
    });

    if (existing) {
      throw new ConflictException('Email hoặc tên đăng nhập đã tồn tại');
    }

    const newUser = await this.customerRepo.create(params as CustomerEntity);
    return newUser;
  }

  async updateUser(params: UpdateCustomerDto): Promise<BasicCustomerInfoDto> {
    const customer = await this.customerRepo.findByPk(params.id);
    if (!customer) {
      throw new NotFoundException('Khách hàng không tồn tại');
    }

    await customer.update(params);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
    };
  }

  async getListCustomers(): Promise<
    Pick<CustomerEntity, 'id' | 'name' | 'email'>[]
  > {
    return this.customerRepo.findAll({
      attributes: ['id', 'name', 'email'],
    });
  }

  async getCustomerById(id: string): Promise<BasicCustomerInfoDto> {
    const customer = await this.customerRepo.findByPk(id);

    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng này');
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
    };
  }

  async getCustomerByEmail(email: string): Promise<CustomerEntity | null> {
    return this.customerRepo.findOne({
      where: { email },
    });
  }

  async changePassword(
    params: ChangePasswordDto,
    customerId: string,
  ): Promise<void> {
    const customer = await this.customerRepo.findByPk(customerId);
    if (!customer) {
      throw new BadRequestException('Không tìm thấy khách hàng');
    }

    const isMatch = await bcrypt.compare(params.oldPassword, customer.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu cũ không chính xác');
    }

    await customer.update({
      password: await bcrypt.hash(params.newPassword, 10),
    });
  }
}
