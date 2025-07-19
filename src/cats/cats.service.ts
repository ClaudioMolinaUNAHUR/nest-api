import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  @InjectRepository(Cat)
  async create(createCatDto: CreateCatDto) {
    try {      
      const cat = this.catsRepository.create(createCatDto);    
      return await this.catsRepository.save(cat);
    } catch (error) {
      console.error(error)
    }
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this.catsRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete({ id });
  }
}
