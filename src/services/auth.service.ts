import { generatePassword } from '@common/utils';
import { BasicInfoDto, ForgotPasswordDto, LoginDto } from '@dto';
import {
  CustomerEntity,
  EmployeeEntity,
  PermissionEntity,
  RoleEntity,
} from '@entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmployeeEntity)
    private readonly employeeRepo: typeof EmployeeEntity,
    @InjectModel(CustomerEntity)
    private readonly customerRepo: typeof CustomerEntity,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(params: LoginDto): Promise<BasicInfoDto> {
    const userExist = await this.employeeRepo.findOne({
      where: {
        [Op.or]: { email: params.username, username: params.username },
        status: true,
      },
      attributes: {
        exclude: ['refreshToken', 'updatedAt', 'createdAt', 'roleId'],
      },
      include: [
        {
          model: RoleEntity,
          attributes: ['id', 'name', 'code'],
          include: [
            {
              model: PermissionEntity,
              as: 'permissions',
              attributes: ['id', 'code', 'name'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    if (!userExist) throw new BadRequestException('Không tìm thấy tài khoản!');

    const isMatch = await bcrypt.compare(params.password, userExist.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu không chính xác!');
    }
    const { accessToken, refreshToken: refreshTokenNew } =
      await this.generateJwt(userExist);

    // save refresh token
    await this.employeeRepo.update(
      {
        refreshToken: refreshTokenNew,
      },
      {
        where: {
          id: userExist.id,
        },
      },
    );

    return {
      accessToken,
      refreshToken: refreshTokenNew,
      id: userExist.id,
      email: userExist.email,
      name: userExist.name,
      phone: userExist.phone,
      status: userExist.status,
      role: userExist.role,
    };
  }

  async generateJwt(user: EmployeeEntity | CustomerEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(user: EmployeeEntity | CustomerEntity) {
    const payload = {
      sub: user.id,
      iss: 'bankcore',
      aud: 'bankcore-web',
      email: user.email,
      role: 'role' in user ? user.role : undefined,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }

  async generateRefreshToken(user: EmployeeEntity | CustomerEntity) {
    return this.jwtService.signAsync(
      { id: user.id },
      {
        subject: String(user.id),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      },
    );
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Omit<BasicInfoDto, 'refreshToken'>> {
    const user = await this.employeeRepo.findOne({
      where: {
        id: userId,
        refreshToken,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'password'],
      },
    });
    if (!user) throw new BadRequestException('Người dùng không tồn tại!');

    const accessToken = await this.generateAccessToken(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      status: user.status,
      role: {
        id: user.role.id,
        name: user.role.name,
        code: user.role.code,
        permissions: user.role.permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          code: permission.code,
        })),
      },
      accessToken,
    };
  }

  async sendNewPassword(params: ForgotPasswordDto): Promise<{
    success: boolean;
  }> {
    const user = await this.employeeRepo.findOne({
      where: {
        email: params.email,
      },
    });
    if (!user) throw new BadRequestException('Người dùng không tồn tại!');
    const newPassword = generatePassword(8);
    console.log(
      '🚀 ~ AuthService ~ sendNewPassword ~ newPassword:',
      newPassword,
    );

    await user.update({
      password: newPassword,
    });

    await this.mailService.sendNewPassword(user.email, newPassword);

    return {
      success: true,
    };
  }

  async loginCustomer(params: LoginDto): Promise<BasicInfoDto> {
    const customer = await this.customerRepo.findOne({
      where: { [Op.or]: { email: params.username, username: params.username } },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });

    if (!customer) throw new BadRequestException('Không tìm thấy khách hàng');

    const isMatch = await bcrypt.compare(params.password, customer.password);
    if (!isMatch) throw new BadRequestException('Mật khẩu không đúng');

    const { accessToken, refreshToken: refreshTokenNew } =
      await this.generateJwt(customer);

    await this.customerRepo.update(
      { refreshToken: refreshTokenNew },
      { where: { id: customer.id } },
    );

    customer.setDataValue('password', ''); // Remove password from response

    return {
      ...customer.get(),
      accessToken,
      refreshToken: refreshTokenNew,
    };
  }
}
