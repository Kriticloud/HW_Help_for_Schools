import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private notificationsRepo: Repository<Notification>,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepo.create(dto);
    const saved = await this.notificationsRepo.save(notification);
    // TODO: integrate FCM push + SMS fallback
    this.logger.log(`Notification created for user ${dto.recipientId}`);
    return saved;
  }

  async findByUser(recipientId: string): Promise<Notification[]> {
    return this.notificationsRepo.find({
      where: { recipientId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await this.notificationsRepo.update(id, { isRead: true });
  }

  async markAllAsRead(recipientId: string): Promise<void> {
    await this.notificationsRepo.update(
      { recipientId, isRead: false },
      { isRead: true },
    );
  }

  async getUnreadCount(recipientId: string): Promise<number> {
    return this.notificationsRepo.count({
      where: { recipientId, isRead: false },
    });
  }
}
