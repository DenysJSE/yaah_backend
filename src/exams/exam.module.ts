import {forwardRef, Module} from '@nestjs/common';
import {ExamService} from './exam.service';
import {ExamController} from './exam.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";
import {AuthModule} from "../auth/auth.module";
import {SubjectEntity} from "../subjects/entities/subject.entity";
import {UserEntity} from "../users/entities/user.entity";
import {UserExamEntity} from "../users/entities/user-exam.entity";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity, QuestionEntity, OptionEntity, SubjectEntity, UserEntity, UserExamEntity]),
    forwardRef(() => AuthModule),
    UsersModule
  ],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [
    ExamService
  ]
})
export class ExamModule {
}
