import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto, UpdateHomeworkDto } from './dto/homework.dto';
import { CurrentUser } from '../../common/decorators';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/enums';
import { User } from '../users/user.entity';

@ApiTags('homework')
@ApiBearerAuth()
@Controller('homework')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Roles(UserRole.TEACHER)
  create(@CurrentUser() user: User, @Body() dto: CreateHomeworkDto) {
    return this.homeworkService.create(user.id, dto);
  }

  @Get()
  findAll(@Query('classId') classId?: string) {
    return this.homeworkService.findAll(classId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.homeworkService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.TEACHER)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.homeworkService.remove(id);
  }
}
