import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from './dto/attendance.dto';
import { CurrentUser } from '../../common/decorators';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/enums';
import { User } from '../users/user.entity';

@ApiTags('attendance')
@ApiBearerAuth()
@Controller('attendance')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles(UserRole.TEACHER)
  mark(@CurrentUser() user: User, @Body() dto: MarkAttendanceDto) {
    return this.attendanceService.markAttendance(user.id, dto);
  }

  @Get('class/:classId')
  findByClassAndDate(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Query('date') date: string,
  ) {
    return this.attendanceService.findByClassAndDate(classId, date);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.attendanceService.findByStudent(studentId);
  }

  @Get('summary/:classId')
  getSummary(
    @Param('classId', ParseUUIDPipe) classId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {
    return this.attendanceService.getClassSummary(classId, month, year);
  }
}
