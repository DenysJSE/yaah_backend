import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ExamService} from './exam.service';
import {CreateExamDto} from './dto/create-exam.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";
import {OptionEntity} from "./entities/option.entity";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";


@ApiTags('Exams')
@Controller('exams')
export class ExamController {
  constructor(
    private readonly testService: ExamService
  ) {
  }

  @ApiOperation({summary: "Exam Creation"})
  @ApiResponse({status: 201, type: [ExamEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter title or length of title is less than 3 character. ' +
      'User does not enter description or length of description is less than 3 character'
  })
  @ApiResponse({status: 409, description: 'The exam with such title already exist'})
  @Post()
  async createExam(@Body() createExamDto: CreateExamDto): Promise<ExamEntity> {
    return this.testService.createExam(createExamDto);
  }

  @ApiOperation({summary: "Question Creation"})
  @ApiResponse({status: 201, type: [QuestionEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter question or length of question is less than 3 character. ' +
      'User does not enter examID'
  })
  @ApiResponse({status: 404, description: 'The exam does not found'})
  @Post('questions')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.testService.createQuestion(createQuestionDto);
  }

  @ApiOperation({summary: "Option Creation"})
  @ApiResponse({status: 201, type: [OptionEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter text of option or length of title is less than 3 character. ' +
      'User does not enter questionID. ' +
      'User does not enter isCorrect value'
  })
  @ApiResponse({status: 404, description: 'The option does not found'})
  @ApiResponse({status: 409, description: 'The correct answer already exist'})
  @Post('options')
  async createOption(@Body() createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return this.testService.createOption(createOptionDto);
  }

  @ApiOperation({summary: "Get all exams"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @ApiResponse({status: 401, description: 'The user is not authorized'})
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllExams() {
    return this.testService.getAllExams()
  }

  @ApiOperation({summary: "Get exam by ID"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @ApiResponse({status: 401, description: 'The user is not authorized'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getExamByID(@Param('id') examID: number): Promise<ExamEntity> {
    return this.testService.getExamByID(examID);
  }
}
