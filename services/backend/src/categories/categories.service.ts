import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoryService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}


  async create(createCategoryDto: CreateCategoryDto) {
    
    return await this.categoryRepository.save(createCategoryDto)
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOne(id);
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
