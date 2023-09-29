import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity, QuestionEntity, OptionEntity]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
