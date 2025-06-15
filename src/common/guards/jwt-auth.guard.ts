import { ALLOW_UNAUTHORIZED_KEY } from '@common/enums';
import { CustomerEntity } from '@entities';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeService } from '@services';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly employeeService: EmployeeService,
    @InjectModel(CustomerEntity)
    private readonly customerModel: typeof CustomerEntity,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    const { id, role } = payload.user;

    if (role) {
      const employee = await this.employeeService.getUserById(id as string);
      if (!employee) throw new UnauthorizedException();
      return { ...employee };
    }

    const customer = await this.customerModel.findByPk(id);
    if (!customer) throw new UnauthorizedException();
    return { ...customer.get() };
  }
}

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowUnauthorized = this.reflector.getAllAndOverride<boolean>(
      ALLOW_UNAUTHORIZED_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (allowUnauthorized) {
      return true;
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
