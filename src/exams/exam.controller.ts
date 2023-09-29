import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {ExamService} from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";
import {OptionEntity} from "./entities/option.entity";


@ApiTags('Exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly testService: ExamService) {}

  @ApiOperation({summary: "Exam Creation"})
  @ApiResponse({status: 200, type: ExamEntity})
  @Post()
  async createTest(@Body() createTestDto: CreateExamDto): Promise<ExamEntity> {
    return this.testService.createTest(createTestDto);
  }

  @ApiOperation({summary: "Question Creation"})
  @ApiResponse({status: 200, type: QuestionEntity})
  @Post('questions')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.testService.createQuestion(createQuestionDto);
  }

  @ApiOperation({summary: "Option Creation"})
  @ApiResponse({status: 200, type: OptionEntity})
  @Post('options')
  async createOption(@Body() createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return this.testService.createOption(createOptionDto);
  }

  @ApiOperation({summary: "Get exam by ID"})
  @ApiResponse({status: 200, type: ExamEntity})
  @Get(':id')
  async getTestWithQuestions(@Param('id') testId: number): Promise<ExamEntity> {
    return this.testService.getTestWithQuestionsAndOptions(testId);
  }
}
