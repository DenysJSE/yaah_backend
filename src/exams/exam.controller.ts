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
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";


@ApiTags('Exams')
@Controller('exams')
export class ExamController {
  constructor(
    private readonly examService: ExamService
  ) {
  }

  @ApiOperation({summary: "Exam Creation"})
  @ApiResponse({status: 201, type: [ExamEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createExam(@Body() createExamDto: CreateExamDto): Promise<ExamEntity> {
    return this.examService.createExam(createExamDto);
  }

  @ApiOperation({summary: "Question Creation"})
  @ApiResponse({status: 201, type: [QuestionEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('questions')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.examService.createQuestion(createQuestionDto);
  }

  @ApiOperation({summary: "Option Creation"})
  @ApiResponse({status: 201, type: [OptionEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('options')
  createOption(@Body() createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    return this.examService.createOption(createOptionDto);
  }

  @ApiOperation({summary: "Get all exams"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllExams() {
    return this.examService.getAllExams()
  }

  @ApiOperation({summary: "Get exam by ID"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getExamByID(@Param('id') examID: number): Promise<ExamEntity> {
    return this.examService.getExamByID(examID);
  }

  @ApiOperation({summary: "Update Exam Info"})
  @ApiResponse({status: 200, type: [ExamEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update_exam/:id')
  updateExam(@Param('id') id: number, @Body() examDto: CreateExamDto) {
    return this.examService.updateExam(id, examDto)
  }

  @ApiOperation({summary: "Update Question Info"})
  @ApiResponse({status: 200, type: [QuestionEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update_question/:id')
  updateQuestion(@Param('id') id: number, @Body() questionDto: CreateQuestionDto) {
    return this.examService.updateQuestion(id, questionDto)
  }

  @ApiOperation({summary: "Update Option Info"})
  @ApiResponse({status: 200, type: [OptionEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update_option/:id')
  updateOption(@Param('id') id: number, @Body() optionDto: CreateOptionDto) {
    return this.examService.updateOption(id, optionDto)
  }

  @ApiOperation({summary: "Delete Exam"})
  @ApiResponse({status: 200, description: 'The exam was deleted!'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteTest(@Param('id') id: number) {
    return this.examService.deleteExam(id)
  }

  @ApiOperation({summary: "Update isDone status"})
  @ApiResponse({status: 200, description: 'The status isDone was updated!', type: [ExamEntity]})
  @Put('update_is_done/:id')
  updateIsDone(@Param('id') id: number) {
    return this.examService.updateIsDone(id)
  }

}
