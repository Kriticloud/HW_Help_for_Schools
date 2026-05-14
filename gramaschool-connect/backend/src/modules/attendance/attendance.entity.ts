import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { AttendanceStatus } from '../../common/enums';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';

@Entity('attendance')
export class Attendance extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @Column({ nullable: true })
  remarks: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column()
  studentId: string;

  @ManyToOne(() => Class, (cls) => cls.attendance)
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column()
  classId: string;

  @Column()
  markedById: string;
}
