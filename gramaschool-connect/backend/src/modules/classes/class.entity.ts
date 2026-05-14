import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { School } from '../schools/school.entity';
import { Student } from '../students/student.entity';
import { Homework } from '../homework/homework.entity';
import { Attendance } from '../attendance/attendance.entity';

@Entity('classes')
export class Class extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  section: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  teacherId: string;

  @ManyToOne(() => School, (school) => school.classes)
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @Column()
  schoolId: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => Homework, (hw) => hw.class)
  homework: Homework[];

  @OneToMany(() => Attendance, (att) => att.class)
  attendance: Attendance[];
}
