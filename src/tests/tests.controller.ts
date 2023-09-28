import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {TestsService} from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import {ApiTags} from "@nestjs/swagger";
import {TestEntity} from "./entities/test.entity";
import {QuestionEntity} from "./entities/question.entity";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";
import {OptionEntity} from "./entities/option.entity";


@ApiTags('Tests')
@Controller('tests')
export class TestsController {
  constructor(private readonly testService: TestsService) {}

  @Post()
  async createTest(@Body() createTestDto: CreateTestDto): Promise<TestEntity> {
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
  async getTestWithQuestions(@Param('id') testId: number): Promise<TestEntity> {
    return this.testService.getTestWithQuestionsAndOptions(testId);
  }
}
