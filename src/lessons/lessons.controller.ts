import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LessonsService} from "./lessons.service";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {LessonEntity} from "./entities/lesson.entity";


@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {

  constructor(private readonly lessonService: LessonsService) {}

  @ApiOperation({summary: "Create a Lesson"})
  @ApiResponse({status: 201, type: [LessonEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter title value or length of title value is less than 3 character. ' +
      'User does not enter lesson data or length of lesson data is less than 3 character. ' +
      'User does not enter subject ID or user enter not a number.'
  })
  @ApiResponse({status: 404, description: 'The subject was not found'})
  @ApiResponse({status: 409, description: 'The lesson already exist'})
  @Post()
  createLesson(@Body() lessonDTO: CreateLessonDto) {
    return this.lessonService.createLesson(lessonDTO)
  }

  @ApiOperation({summary: "Get All Lessons"})
  @ApiResponse({status: 200, type: [LessonEntity]})
  @Get()
  getAllLessons() {
    return this.lessonService.getAllLessons()
  }

  @ApiOperation({summary: "Update a Lesson"})
  @ApiResponse({status: 201, type: [LessonEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter title value or length of title value is less than 3 character. ' +
      'User does not enter lesson data or length of lesson data is less than 3 character. ' +
      'User does not enter subject ID or user enter not a number.'
  })
  @ApiResponse({status: 404, description: 'The lesson is not found'})
  @Put('update_lesson/:id')
  updateLesson(@Param('id') id: number, @Body() lessonDTO: CreateLessonDto) {
    return this.lessonService.updateLesson(id, lessonDTO)
  }

  @ApiOperation({summary: "Delete a Lesson"})
  @ApiResponse({status: 200, description: 'The lesson is deleted successfully'})
  @ApiResponse({status: 404, description: 'The lesson is not found'})
  @Delete(':id')
  deleteLesson(@Param('id') id: number) {
    return this.lessonService.deleteLesson(id)
  }

  @ApiOperation({summary: "Update isDone status"})
  @ApiResponse({status: 200, description: 'The status isDone was updated!', type: [LessonEntity]})
  @ApiResponse({status: 404, description: 'Lesson was not found!'})
  @ApiResponse({status: 409, description: 'Lesson is already done!'})
  @Put('update_is_done/:id')
  updateIsDone(@Param('id') id: number) {
    return this.lessonService.updateIsDone(id)
  }

}
