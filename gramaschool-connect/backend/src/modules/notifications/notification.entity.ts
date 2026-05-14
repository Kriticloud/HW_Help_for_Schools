import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { NotificationType } from '../../common/enums';

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column()
  recipientId: string;

  @Column({ nullable: true })
  referenceId: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: false })
  isSent: boolean;
}
