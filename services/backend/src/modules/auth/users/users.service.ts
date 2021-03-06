import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNotFoundError } from 'src/errors/user-not-found.error';
import { BaseCRUDService } from 'src/modules/shared/services/base-entity-service';
import { UserPayload } from '../permissions/dto/user.payload';
import { RolesKeys } from '../roles/roles-keys.constants';
import { RolesService } from '../roles/roles.service';
import { UserLoginDTO } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService extends BaseCRUDService<User> {
  constructor(
    private jwtService: JwtService,
    private roleService: RolesService,
    protected repository: UserRepository,
  ) {
    super();
  }

  protected async beforeCreate(user: User) {
    const mandatoryRole = await this.roleService.findByKey(RolesKeys.User);
    user.password = await bcrypt.hash(user.password, 10);
    user.roles = [mandatoryRole];
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async loginUser(userDto: UserLoginDTO) {
    const user = await this.findByEmail(userDto.email);
    const authenticationPassed =
      user && bcrypt.compareSync(userDto.password, user.password);
    if (authenticationPassed) {
      const userPayload = { id: user.id };
      const authToken = this.jwtService.sign(userPayload);
      return {
        userId: user.id,
        authToken,
      };
    }
  }

  async addRole(userId: string, roleId: string) {
    await this.repository.addRole(userId, roleId);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findEntityByCondition({
      where: {
        email,
      },
    });
  }

  async getUserAuth(payload: UserPayload): Promise<User | UserNotFoundError> {
    if (!payload) {
      return await this.getAnonymousUser();
    }
    const user = await this.findOneEntity(payload.id);
    if (user) {
      return user;
    } else {
      return await this.getAnonymousUser();
    }
  }

  decodeAuthToken(authToken: string): UserPayload {
    const payload = this.jwtService.decode(authToken);
    return payload as UserPayload;
  }

  private async getAnonymousUser(): Promise<User> {
    const role = await this.roleService.findByKey(RolesKeys.Anonymous);
    return {
      roles: [role],
    } as User;
  }
}
