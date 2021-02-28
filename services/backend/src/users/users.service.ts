import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RolesKeys } from 'src/roles-and-permissions/constants/roles-keys.constants';
import { UserPayload } from 'src/roles-and-permissions/models/user.payload';
import { RolesService } from 'src/roles-and-permissions/services/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { User } from './user.entity';

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

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      }
    })
  }

  async getUserAuth(payload: UserPayload): Promise<User> {
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
