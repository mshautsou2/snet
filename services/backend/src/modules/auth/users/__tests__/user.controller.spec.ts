import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { RolesService } from 'modules/auth/roles/roles.service';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { UserController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UsersService,
        { provide: JwtService, useValue: {} },
        { provide: RolesService, useValue: {} },
        { provide: UserRepository, useValue: {} },
      ],
    }).compile();
    userService = moduleRef.get<UsersService>(UsersService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        {
          email: 'test@gmail.com',
          password: 'test',
          roles: [],
          username: 'test',
          owner: this,
          id: 'test-id',
        },
      ];
      jest.spyOn(userService, 'findAll').mockImplementation(async () => result);
      expect(await userController.findAll()).toBe(result);
    });
  });
});
