import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { databaseConfig } from './database/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { ClassesModule } from './modules/classes/classes.module';
import { StudentsModule } from './modules/students/students.module';
import { MessagesModule } from './modules/messages/messages.module';
import { HomeworkModule } from './modules/homework/homework.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    AuthModule,
    UsersModule,
    SchoolsModule,
    ClassesModule,
    StudentsModule,
    MessagesModule,
    HomeworkModule,
    AttendanceModule,
    NotificationsModule,
    StorageModule,
  ],
})
export class AppModule {}
