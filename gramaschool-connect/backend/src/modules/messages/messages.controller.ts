import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/message.dto';
import { CurrentUser } from '../../common/decorators';
import { User } from '../users/user.entity';

@ApiTags('messages')
@ApiBearerAuth()
@Controller('messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(user.id, dto);
  }

  @Get('class/:classId')
  findByClass(@Param('classId', ParseUUIDPipe) classId: string) {
    return this.messagesService.findByClass(classId);
  }

  @Get('conversation')
  findConversation(
    @Query('user1') user1: string,
    @Query('user2') user2: string,
  ) {
    return this.messagesService.findConversation(user1, user2);
  }

  @Patch(':id/read')
  markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.messagesService.markAsRead(id);
  }
}
