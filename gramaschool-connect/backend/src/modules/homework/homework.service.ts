import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from './homework.entity';
import { CreateHomeworkDto, UpdateHomeworkDto } from './dto/homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private homeworkRepo: Repository<Homework>,
  ) {}

  async create(teacherId: string, dto: CreateHomeworkDto): Promise<Homework> {
    const hw = this.homeworkRepo.create({ ...dto, teacherId });
    return this.homeworkRepo.save(hw);
  }

  async findAll(classId?: string): Promise<Homework[]> {
    const where = classId ? { classId } : {};
    return this.homeworkRepo.find({
      where,
      relations: ['class'],
      order: { dueDate: 'ASC' },
    });
  }

  async findById(id: string): Promise<Homework> {
    const hw = await this.homeworkRepo.findOne({
      where: { id },
      relations: ['class'],
    });
    if (!hw) throw new NotFoundException('Homework not found');
    return hw;
  }

  async update(id: string, dto: UpdateHomeworkDto): Promise<Homework> {
    await this.findById(id);
    await this.homeworkRepo.update(id, dto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const hw = await this.findById(id);
    await this.homeworkRepo.remove(hw);
  }
}
