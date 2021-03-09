import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from 'errors/unauthorized.error';
import { BaseCRUDService } from 'modules/shared/services/base-entity-service';
import { UserPayload } from '../permissions/dto/user.payload';
import { RolesKeys } from '../roles/roles-keys.constants';
import { RolesService } from '../roles/roles.service';
import { UserLoginDto } from './dto/user-login.dto';
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

  async createEntity(user: User): Promise<User> {
    const mandatoryRole = await this.roleService.findByKey(RolesKeys.User);
    user.password = await bcrypt.hash(user.password, 10);
    user.roles = [mandatoryRole];
    const result = await this.repository.saveEntity(user);
    this.update(result.id, {
      owner: user,
    });
    return await this.findOneEntity(result.id);
  }

  findAll(): Promise<User[]> {
    return this.repository.findAllEntities();
  }

  async loginUser(userDto: UserLoginDto) {
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
    } else {
      throw new UnauthorizedError('Invalid login or password');
    }
  }

  async addRole(userId: string, roleId: string) {
    await this.repository.addRole(userId, roleId);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findEntityByProperties({
      email,
    });
  }

  async getUserAuth(payload: UserPayload): Promise<User> {
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
