import {forwardRef, Module} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LessonEntity} from "./entities/lesson.entity";
import {SubjectEntity} from "../subjects/entities/subject.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonEntity, SubjectEntity]),
    forwardRef(() => AuthModule)
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService]
})
export class LessonsModule {}
