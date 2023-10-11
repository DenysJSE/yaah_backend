import {Controller, Get, Post, Body, Param, UseGuards, Put, Delete} from '@nestjs/common';
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
    private readonly examService: ExamService
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
  createExam(@Body() createExamDto: CreateExamDto): Promise<ExamEntity> {
    return this.examService.createExam(createExamDto);
  }

  @ApiOperation({summary: "Question Creation"})
  @ApiResponse({status: 201, type: [QuestionEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter question or length of question is less than 3 character. ' +
      'User does not enter examID'
  })
  @ApiResponse({status: 404, description: 'The exam does not found'})
  @Post('questions')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.examService.createQuestion(createQuestionDto);
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
  createOption(@Body() createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return this.examService.createOption(createOptionDto);
  }

  @ApiOperation({summary: "Get all exams"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @ApiResponse({status: 401, description: 'The user is not authorized'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllExams() {
    return this.examService.getAllExams()
  }

  @ApiOperation({summary: "Get exam by ID"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @ApiResponse({status: 401, description: 'The user is not authorized'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getExamByID(@Param('id') examID: number): Promise<ExamEntity> {
    return this.examService.getExamByID(examID);
  }

  @ApiOperation({summary: "Update Exam Info"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter title or length of title is less than 3 character. ' +
      'User does not enter description or length of description is less than 3 character'
  })
  @ApiResponse({status: 404, description: 'Exam not found!'})
  @Put('update_exam/:id')
  updateExam(@Param('id') id: number, @Body() examDto: CreateExamDto) {
    return this.examService.updateExam(id, examDto)
  }

  @ApiOperation({summary: "Update Question Info"})
  @ApiResponse({status: 200, type: [QuestionEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter question or length of question is less than 3 character. ' +
      'User does not enter examID'
  })
  @ApiResponse({status: 404, description: 'Question not found!'})
  @Put('update_question/:id')
  updateQuestion(@Param('id') id: number, @Body() questionDto: CreateQuestionDto) {
    return this.examService.updateQuestion(id, questionDto)
  }

  @ApiOperation({summary: "Update Option Info"})
  @ApiResponse({status: 200, type: [OptionEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter text of option or length of title is less than 3 character. ' +
      'User does not enter questionID. ' +
      'User does not enter isCorrect value'
  })
  @ApiResponse({status: 404, description: 'Option not found!'})
  @Put('update_option/:id')
  updateOption(@Param('id') id: number, @Body() optionDto: CreateOptionDto) {
    return this.examService.updateOption(id, optionDto)
  }

  @ApiOperation({summary: "Delete Exam"})
  @ApiResponse({status: 200, description: 'The exam was deleted!'})
  @ApiResponse({status: 404, description: 'Exam was not found!'})
  @Delete(':id')
  deleteTest(@Param('id') id: number) {
    return this.examService.deleteExam(id)
  }

}
