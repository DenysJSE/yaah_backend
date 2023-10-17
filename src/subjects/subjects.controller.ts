import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SubjectsService} from "./subjects.service";
import {SubjectDto} from "./dto/subject.dto";
import {SubjectEntity} from "./entities/subject.entity";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";


@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {

  constructor(private readonly subjectService: SubjectsService) {
  }

  @ApiOperation({summary: "Create a Subject"})
  @ApiResponse({status: 201, type: [SubjectEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
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
  @Get('/:id')
  getSubjectById(@Param('id') id: number) {
    return this.subjectService.getSubjectById(id)
  }

  @ApiOperation({summary: "Update a Subject"})
  @ApiResponse({status: 201, type: [SubjectEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(':id')
  updateSubject(@Param('id') id: number, @Body() subjectDto: SubjectDto) {
    return this.subjectService.updateSubject(id, subjectDto)
  }

  @ApiOperation({summary: "Delete a Subject"})
  @ApiResponse({status: 200, description: 'The subject is deleted successfully'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteSubject(@Param('id') id: number) {
    return this.subjectService.deleteSubject(id)
  }

}
