import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SubjectsService} from "./subjects.service";
import {SubjectDto} from "./dto/subject.dto";
import {SubjectEntity} from "./entities/subject.entity";


@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {

  constructor(private readonly subjectService: SubjectsService) {
  }

  @ApiOperation({summary: "Create a Subject"})
  @ApiResponse({status: 201, type: [SubjectEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter title value or length of title value is less than 3 character. ' +
      'User does not enter description or length of description is less than 3 character. ' +
      'User does not enter lesson number or user enter not a number. ' +
      'User does not enter test number or user enter not a number. ' +
      'User does not enter course duration or user enter not a number. '
  })
  @ApiResponse({status: 409, description: 'The subject already exist'})
  @Post()
  createSubject(@Body() subjectDto: SubjectDto) {
    return this.subjectService.createSubject(subjectDto)
  }

  @ApiOperation({summary: "Get All Subjects"})
  @ApiResponse({status: 200, type: [SubjectEntity]})
  @Get()
  getAllSubjects() {
    return this.subjectService.getAllSubjects()
  }

  @ApiOperation({summary: "Get Subject By ID"})
  @ApiResponse({status: 200, type: [SubjectEntity]})
  @ApiResponse({status: 404, description: 'The subject is not found'})
  @Get('/:id')
  getSubjectById(@Param('id') id: number) {
    return this.subjectService.getSubjectById(id)
  }

  @ApiOperation({summary: "Update a Subject"})
  @ApiResponse({status: 201, type: [SubjectEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter title value or length of title value is less than 3 character. ' +
      'User does not enter description or length of description is less than 3 character. ' +
      'User does not enter lesson number or user enter not a number. ' +
      'User does not enter test number or user enter not a number. ' +
      'User does not enter course duration or user enter not a number. '
  })
  @ApiResponse({status: 404, description: 'The subject is not found'})
  @Put(':id')
  updateSubject(@Param('id') id: number, @Body() subjectDto: SubjectDto) {
    return this.subjectService.updateSubject(id, subjectDto)
  }

  @ApiOperation({summary: "Delete a Subject"})
  @ApiResponse({status: 200, description: 'The subject is deleted successfully'})
  @ApiResponse({status: 404, description: 'The subject is not found'})
  @Delete(':id')
  deleteSubject(@Param('id') id: number) {
    return this.subjectService.deleteSubject(id)
  }

}
