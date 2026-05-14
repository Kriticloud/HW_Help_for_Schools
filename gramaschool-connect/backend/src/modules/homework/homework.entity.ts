import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { HomeworkStatus } from '../../common/enums';
import { Class } from '../classes/class.entity';

@Entity('homework')
export class Homework extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: HomeworkStatus, default: HomeworkStatus.ASSIGNED })
  status: HomeworkStatus;

  @Column({ nullable: true })
  attachmentUrl: string;

  @Column()
  teacherId: string;

  @ManyToOne(() => Class, (cls) => cls.homework)
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column()
  classId: string;
}
