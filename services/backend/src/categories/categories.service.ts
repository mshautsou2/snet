import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private userService: UsersService,
  ) { }


  async create(createCategoryDto: CreateCategoryDto) {

    return await this.categoryRepository.save({
      ...createCategoryDto,
      owner: await this.userService.findOne(createCategoryDto.owner),
    })
  }

  async isOwner(userId: string, categoryId: string) {
    return await this.categoryRepository.createQueryBuilder('category')
      .where('category.id = :categoryId', { categoryId })
      .leftJoin('category.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOne(id, {
      join: {
        alias: 'categories',
        leftJoinAndSelect: {
          topcis: 'categories.topics',
        },

      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const toUpdate = await this.categoryRepository.findOne(id);
    if (!toUpdate) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }
    Object.assign(toUpdate, updateCategoryDto);
    return await this.categoryRepository.save(toUpdate);
  }

  async remove(id: string) {
    const toDelete = await this.categoryRepository.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }
    return await this.categoryRepository.remove(toDelete);
  }
}
