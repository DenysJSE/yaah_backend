import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import * as dotenv from 'dotenv';
import {AuthModule} from "../auth/auth.module";
import {RoleEntity} from "../roles/entities/role.entity";
import {RolesModule} from "../roles/roles.module";
import {LessonEntity} from "../lessons/entities/lesson.entity";
import {UserLessonEntity} from "./entities/user-lesson.entity";
import {ExamEntity} from "../exams/entities/exam.entity";
import {UserExamEntity} from "./entities/user-exam.entity";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, LessonEntity, ExamEntity, UserLessonEntity, UserExamEntity]),
    forwardRef(() => AuthModule),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
