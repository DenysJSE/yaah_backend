import {forwardRef, Module} from '@nestjs/common';
import {SubjectsService} from './subjects.service';
import {SubjectsController} from './subjects.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubjectEntity} from "./entities/subject.entity";
import {AuthModule} from "../auth/auth.module";
import {LessonEntity} from "../lessons/entities/lesson.entity";
import {ExamEntity} from "../exams/entities/exam.entity";
import {UserLessonEntity} from "../users/entities/user-lesson.entity";
import {UserExamEntity} from "../users/entities/user-exam.entity";
import {QuestionEntity} from "../exams/entities/question.entity";
import {OptionEntity} from "../exams/entities/option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectEntity, LessonEntity, ExamEntity, UserLessonEntity, UserExamEntity, QuestionEntity, OptionEntity]),
    forwardRef(() => AuthModule)
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {
}
