import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepo: Repository<Message>,
  ) {}

  async create(senderId: string, dto: CreateMessageDto): Promise<Message> {
    const message = this.messagesRepo.create({ ...dto, senderId });
    return this.messagesRepo.save(message);
  }

  async findByClass(classId: string): Promise<Message[]> {
    return this.messagesRepo.find({
      where: { classId },
      relations: ['sender'],
      order: { createdAt: 'DESC' },
    });
  }

  async findConversation(userId1: string, userId2: string): Promise<Message[]> {
    return this.messagesRepo
      .createQueryBuilder('msg')
      .leftJoinAndSelect('msg.sender', 'sender')
      .where(
        '(msg.senderId = :u1 AND msg.recipientId = :u2) OR (msg.senderId = :u2 AND msg.recipientId = :u1)',
        { u1: userId1, u2: userId2 },
      )
      .orderBy('msg.createdAt', 'ASC')
      .getMany();
  }

  async findById(id: string): Promise<Message> {
    const msg = await this.messagesRepo.findOne({
      where: { id },
      relations: ['sender'],
    });
    if (!msg) throw new NotFoundException('Message not found');
    return msg;
  }

  async markAsRead(id: string): Promise<void> {
    await this.messagesRepo.update(id, { isRead: true });
  }
}
