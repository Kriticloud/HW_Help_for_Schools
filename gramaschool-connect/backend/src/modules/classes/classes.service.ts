import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepo: Repository<Class>,
  ) {}

  async create(dto: CreateClassDto): Promise<Class> {
    const cls = this.classesRepo.create(dto);
    return this.classesRepo.save(cls);
  }

  async findAll(schoolId?: string): Promise<Class[]> {
    const where = schoolId ? { schoolId } : {};
    return this.classesRepo.find({ where, relations: ['school'] });
  }

  async findById(id: string): Promise<Class> {
    const cls = await this.classesRepo.findOne({
      where: { id },
      relations: ['school', 'students'],
    });
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }

  async update(id: string, dto: UpdateClassDto): Promise<Class> {
    await this.findById(id);
    await this.classesRepo.update(id, dto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const cls = await this.findById(id);
    await this.classesRepo.remove(cls);
  }
}
