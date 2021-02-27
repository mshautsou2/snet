import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesKeys } from 'src/roles-and-permissions/constants/roles-keys.constants';
import { UserPayload } from 'src/roles-and-permissions/dto/user.payload';
import { RolesService } from 'src/roles-and-permissions/services/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
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
    user.roles = [ mandatoryRole ]
    console.log('trying to save', user)
    return this.userRepository.save(user);

  }


  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
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
