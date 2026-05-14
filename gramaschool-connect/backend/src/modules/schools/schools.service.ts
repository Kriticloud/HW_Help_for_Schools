import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolsRepo: Repository<School>,
  ) {}

  async create(dto: CreateSchoolDto): Promise<School> {
    const school = this.schoolsRepo.create(dto);
    return this.schoolsRepo.save(school);
  }

  async findAll(): Promise<School[]> {
    return this.schoolsRepo.find();
  }

  async findById(id: string): Promise<School> {
    const school = await this.schoolsRepo.findOne({
      where: { id },
      relations: ['classes'],
    });
    if (!school) throw new NotFoundException('School not found');
    return school;
  }

  async update(id: string, dto: UpdateSchoolDto): Promise<School> {
    await this.findById(id);
    await this.schoolsRepo.update(id, dto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.schoolsRepo.update(id, { isActive: false });
  }
}
