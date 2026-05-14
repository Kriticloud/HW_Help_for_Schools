import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentsRepo.create(dto);
    return this.studentsRepo.save(student);
  }

  async findAll(classId?: string): Promise<Student[]> {
    const where = classId ? { classId } : {};
    return this.studentsRepo.find({ where, relations: ['class'] });
  }

  async findById(id: string): Promise<Student> {
    const student = await this.studentsRepo.findOne({
      where: { id },
      relations: ['class'],
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findByParentId(parentId: string): Promise<Student[]> {
    return this.studentsRepo.find({
      where: { parentId },
      relations: ['class'],
    });
  }

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    await this.findById(id);
    await this.studentsRepo.update(id, dto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.studentsRepo.update(id, { isActive: false });
  }
}
