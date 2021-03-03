import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'src/errors/NotFoundError';
import { RolesKeys } from 'src/modules/roles/roles-keys.constants';
import { UserPayload } from 'src/modules/permissions/user.payload';
import { RolesService } from 'src/modules/roles/roles.service';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { User } from './user.entity';

export class UserNotFoundError {
  message = "User not found"
}

@Injectable()
export class UsersService {

  constructor(
    private jwtService: JwtService,
    private roleService: RolesService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {

  }

  async create(userDto: CreateUserDTO) {
    const mandatoryRole = await this.roleService.findByKey(RolesKeys.User);
    const user = new User();
    Object.assign(user, userDto);
    const hash = await bcrypt.hash(userDto.password, 10);
    user.password = hash;
    user.roles = [mandatoryRole]
    return this.userRepository.save(user);
  }

  async loginUser(userDto: UserLoginDTO) {
    const throwDelayedError = (message) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(new UnprocessableEntityException(message));
      }, 3000)
    })

    let user = await this.findByEmail(userDto.email);
    let authenticationPassed = false;
    if (user) {
      const isMatch = bcrypt.compareSync(userDto.password, user.password)
      if (isMatch) {
        authenticationPassed = true;
      }
    }
    if (authenticationPassed) {
      const userPayload = { id: user.id }
      const authToken = this.jwtService.sign(userPayload);
      return {
        userId: user.id,
        authToken,
      }
    } else {
      return await throwDelayedError('Username or password is invalid');
    }
  }

  async addRole(userId: string, roleId: string) {

    await getConnection()
        .createQueryBuilder()
        .relation(User, "roles")
        .of(userId)
        .add(roleId)
  }

  async findOne(id: string){
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      }
    })
  }

  async getUserAuth(payload: UserPayload): Promise<User | UserNotFoundError> {
    if (!payload) {
      return await this.getAnonymousUser();
    }
    const user = await this.findOne(payload.id)
    if (user) {
      return user;
    } else {
      return await this.getAnonymousUser();
    }
  }

  decodeAuthToken(authToken): UserPayload {
    const payload = this.jwtService.decode(authToken);
    return payload as UserPayload;
  }

  private async getAnonymousUser(): Promise<User> {
    const role = await this.roleService.findByKey(RolesKeys.Anonymous);
    return {
      roles: [role]
    } as User;
  }
}
