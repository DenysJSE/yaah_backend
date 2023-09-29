import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {ExamService} from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import {ApiTags} from "@nestjs/swagger";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";
import {OptionEntity} from "./entities/option.entity";


@ApiTags('Exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly testService: ExamService) {}

  @Post()
  async createTest(@Body() createTestDto: CreateExamDto): Promise<ExamEntity> {
    return this.testService.createTest(createTestDto);
  }

  @Post('questions')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.testService.createQuestion(createQuestionDto);
  }

  @Post('options')
  async createOption(@Body() createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return this.testService.createOption(createOptionDto);
  }

  @Get(':id')
  async getTestWithQuestions(@Param('id') testId: number): Promise<ExamEntity> {
    return this.testService.getTestWithQuestionsAndOptions(testId);
  }
}
