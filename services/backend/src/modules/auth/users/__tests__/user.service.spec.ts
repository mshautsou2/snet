import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Role } from 'modules/auth/roles/role.entity';
import { RolesKeys } from 'modules/auth/roles/roles-keys.constants';
import { RolesService } from 'modules/auth/roles/roles.service';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { UsersService } from '../users.service';

describe('UserService', () => {
  let mockUserService: UsersService;
  const userRepository = {
    saveEntity: async (user: User) => user,
    findAllEntities: async () => [],
    findEntity: async (id: string) => new User({ id }),
    updateEntity: async () => new User({}),
  };

  const mockRoleService = {
    findByKey: async (key: RolesKeys) => new Role({ key }),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: JwtService, useValue: {} },
        { provide: RolesService, useValue: mockRoleService },
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();
    mockUserService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(mockUserService).toBeDefined();
  });

  describe('create user', () => {
    it('should create user correctly', async function () {
      const user: User = {
        id: undefined,
        email: 'test@test.com',
        username: 'test',
        password: 'test',
        roles: [],
        owner: undefined,
      };
      jest.spyOn(userRepository, 'saveEntity').mockResolvedValue(user);
      await mockUserService.createEntity(user);

      expect(userRepository.saveEntity).toBeCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: undefined,
          email: 'test@test.com',
          username: 'test',
          password: 'test',
          roles: [],
          owner: undefined,
        },
      ];
      jest
        .spyOn(userRepository, 'findAllEntities')
        .mockImplementation(async () => users);
      expect(await mockUserService.findAll()).toBe(users);
    });
  });
});
