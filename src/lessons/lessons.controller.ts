import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LessonsService} from "./lessons.service";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {LessonEntity} from "./entities/lesson.entity";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";


@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {

  constructor(private readonly lessonService: LessonsService) {}

  @ApiOperation({summary: "Create a Lesson"})
  @ApiResponse({status: 201, type: [LessonEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
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
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update_lesson/:id')
  updateLesson(@Param('id') id: number, @Body() lessonDTO: CreateLessonDto) {
    return this.lessonService.updateLesson(id, lessonDTO)
  }

  @ApiOperation({summary: "Delete a Lesson"})
  @ApiResponse({status: 200, description: 'The lesson is deleted successfully'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteLesson(@Param('id') id: number) {
    return this.lessonService.deleteLesson(id)
  }

  @ApiOperation({summary: "Update isDone status"})
  @ApiResponse({status: 200, description: 'The status isDone was updated!', type: [LessonEntity]})
  @Put('update_is_done/:id')
  updateIsDone(@Param('id') id: number) {
    return this.lessonService.updateIsDone(id)
  }

}
