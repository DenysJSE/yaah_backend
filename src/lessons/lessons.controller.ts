import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LessonsService} from "./lessons.service";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {LessonEntity} from "./entities/lesson.entity";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";


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

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('get_all')
  getAllLessonsWithUserStatus() {
    return this.lessonService.getAllLessonsWithUserStatus()
  }

  @Get('lesson_list')
  getLessonList() {
    return this.lessonService.getLessonListBySubject()
  }

  @ApiOperation({summary: "Get All Lessons"})
  @ApiResponse({status: 200, type: [LessonEntity]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllLessons(@Request() req: any) {
    const userId = req.user.id
    return this.lessonService.getAllLessons(userId)
  }

  @Get(':id')
  getLessonById(@Param('id') id: number) {
    return this.lessonService.getLessonById(id)
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
  @UseGuards(JwtAuthGuard)
  @Put('update_is_done/:id')
  updateIsDone(@Request() req: any, @Param('id') id: number) {
    const userId = req.user.id
    return this.lessonService.updateIsDone(userId, id)
  }

}
