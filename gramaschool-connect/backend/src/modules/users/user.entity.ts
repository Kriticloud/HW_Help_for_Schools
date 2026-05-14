import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserRole, Language } from '../../common/enums';
import { School } from '../schools/school.entity';
import { Message } from '../messages/message.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: Language, default: Language.ENGLISH })
  preferredLanguage: Language;

  @Column({ nullable: true })
  firebaseUid: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  fcmToken: string;

  @ManyToOne(() => School, (school) => school.users, { nullable: true })
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @Column({ nullable: true })
  schoolId: string;

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];
}
