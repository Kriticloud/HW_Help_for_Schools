import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../users/user.entity';
import { Class } from '../classes/class.entity';

@Entity('schools')
export class School extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  principalName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.school)
  users: User[];

  @OneToMany(() => Class, (cls) => cls.school)
  classes: Class[];
}
