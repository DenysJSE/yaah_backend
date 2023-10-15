import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LessonEntity} from "./entities/lesson.entity";
import {SubjectEntity} from "../subjects/entities/subject.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonEntity, SubjectEntity])
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService]
})
export class LessonsModule {}
