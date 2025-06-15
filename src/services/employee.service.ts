import {
  BasicInfoDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from '@dto';
import {
  EmployeeEntity,
  PermissionEntity,
  RoleEntity,
  RolePermissionsEntity,
} from '@entities';
import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from '@services';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EmployeeEntity)
    private readonly employeeRepo: typeof EmployeeEntity,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  async createUser(params: CreateUserDto) {
    const existingUser = await this.employeeRepo.findOne({
      where: { email: params.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // check roleId
    const role = await this.roleService.findById(params.roleId);
    if (!role) {
      throw new BadRequestException('Không tìm thấy quyền này!');
    }

    // create user step
    const newUser = await this.employeeRepo.create(params as EmployeeEntity);
    return newUser;
  }

  async updateUser(
    params: UpdateUserDto,
  ): Promise<Omit<BasicInfoDto, 'accessToken' | 'refreshToken'>> {
    const user = await this.employeeRepo.findByPk(params.id, {
      include: [
        {
          model: RoleEntity,
          required: true,
          attributes: ['id', 'code', 'name'],
          include: [
            {
              model: PermissionEntity,
              required: true,
              attributes: ['id', 'code', 'name'],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại!');
    }

    // Validate roleId if provided
    if (params.roleId && params.roleId !== user.role.id) {
      const role = await this.roleService.findById(params.roleId);
      if (!role) {
        throw new BadRequestException('Không tìm thấy quyền này!');
      }
    }

    // Update user
    await user.update(params);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      role: user.role,
    };
  }

  async getListUsers() {
    return await this.employeeRepo.findAll({
      attributes: ['id', 'fullName', 'email'],
      include: [
        {
          model: RoleEntity,
          required: true,
          attributes: ['id', 'roleName'],
        },
      ],
    });
  }

  async getUserById(
    id: string,
  ): Promise<Omit<BasicInfoDto, 'accessToken' | 'refreshToken'>> {
    const user = await this.employeeRepo.findOne({
      where: { id },
      attributes: ['id', 'fullName', 'email', 'phoneNumber', 'birthday'],
      include: [
        {
          model: RoleEntity,
          required: true,
          attributes: ['id', 'code', 'name'],
          include: [
            {
              model: PermissionEntity,
              required: true,
              attributes: ['id', 'code', 'name'],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng này!');
    }

    const permissions = await PermissionEntity.findAll({
      include: [
        {
          model: RolePermissionsEntity,
          where: {
            roleId: user.role.id,
          },
          attributes: ['id'],
        },
      ],
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      role: {
        id: user.role.id,
        name: user.role.name,
        code: user.role.code,
        permissions: permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          code: permission.code,
        })),
      },
    };
  }

  getUserByEmail(email: string) {
    return this.employeeRepo.findOne({ where: { email } });
  }

  async changePassword(params: ChangePasswordDto, userId: string) {
    const user = await this.employeeRepo.findOne({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException('User was not found!');
    const isMatch = await bcrypt.compare(params.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('The password is wrong!');
    }
    await this.employeeRepo.update(
      {
        password: await bcrypt.hash(params.newPassword, 10),
      },
      {
        where: { id: userId },
      },
    );
  }
}
