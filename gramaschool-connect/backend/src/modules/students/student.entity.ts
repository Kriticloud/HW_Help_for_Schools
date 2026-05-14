import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Class } from '../classes/class.entity';

@Entity('students')
export class Student extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  rollNumber: string;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => Class, (cls) => cls.students)
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column()
  classId: string;

  @Column({ default: true })
  isActive: boolean;
}
