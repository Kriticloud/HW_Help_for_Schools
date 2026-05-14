import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { MarkAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  async markAttendance(
    markedById: string,
    dto: MarkAttendanceDto,
  ): Promise<Attendance[]> {
    const records = dto.entries.map((entry) =>
      this.attendanceRepo.create({
        studentId: entry.studentId,
        status: entry.status,
        remarks: entry.remarks,
        classId: dto.classId,
        date: new Date(dto.date),
        markedById,
      }),
    );
    return this.attendanceRepo.save(records);
  }

  async findByClassAndDate(
    classId: string,
    date: string,
  ): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { classId, date: new Date(date) },
      relations: ['student'],
    });
  }

  async findByStudent(studentId: string): Promise<Attendance[]> {
    return this.attendanceRepo.find({
      where: { studentId },
      order: { date: 'DESC' },
    });
  }

  async getClassSummary(
    classId: string,
    month: number,
    year: number,
  ): Promise<{ total: number; present: number; absent: number; late: number }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const records = await this.attendanceRepo
      .createQueryBuilder('att')
      .where('att.classId = :classId', { classId })
      .andWhere('att.date >= :startDate', { startDate })
      .andWhere('att.date <= :endDate', { endDate })
      .getMany();

    return {
      total: records.length,
      present: records.filter((r) => r.status === 'present').length,
      absent: records.filter((r) => r.status === 'absent').length,
      late: records.filter((r) => r.status === 'late').length,
    };
  }
}
