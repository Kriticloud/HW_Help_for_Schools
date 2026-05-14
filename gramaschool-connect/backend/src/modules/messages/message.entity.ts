import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { MessageType } from '../../common/enums';
import { User } from '../users/user.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column({ nullable: true })
  translatedContent: string;

  @Column({ nullable: true })
  targetLanguage: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  senderId: string;

  @Column({ nullable: true })
  recipientId: string;

  @Column({ nullable: true })
  classId: string;

  @Column({ default: false })
  isRead: boolean;
}
