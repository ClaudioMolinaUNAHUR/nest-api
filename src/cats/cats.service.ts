import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Controller('cats')
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedsRepository: Repository<Breed>,
  ) {}

  @InjectRepository(Cat)
  async create(createCatDto: CreateCatDto) {
    try {
      const breed = await this.breedsRepository.findOne({
        where: { name: createCatDto.breed },
      });
      if (!breed) {
        throw new Error('Breed not found');
      }
      const cat = this.catsRepository.create({
        ...createCatDto,
        breed,
      });
      return await this.catsRepository.save(cat);
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    // return await this.catsRepository.update(id, updateCatDto);
    return;
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete({ id });
  }
}
