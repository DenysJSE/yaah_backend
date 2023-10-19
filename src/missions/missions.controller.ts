import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MissionsService} from "./missions.service";
import {CreateMissionDto} from "./dto/create-mission.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {MissionEntity} from "./entities/mission.entity";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";


@ApiTags('Missions')
@Controller('missions')
export class MissionsController {

  constructor(private readonly missionService: MissionsService) {}

  @ApiOperation({summary: "Create Mission"})
  @ApiResponse({status: 200, type: [MissionEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createMission(@Body() missionDTO: CreateMissionDto) {
    return this.missionService.createMission(missionDTO)
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('get_all')
  getAllLessonsWithUserStatus() {
    return this.missionService.getAllMissionsWithUserStatus()
  }

  @ApiOperation({summary: "Get All Mission"})
  @ApiResponse({status: 200, type: [MissionEntity]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllMission(@Request() req: any) {
    const userId = req.user.id
    return this.missionService.getAllMission(userId)
  }

  @ApiOperation({summary: "Get Mission By ID"})
  @ApiResponse({status: 200, type: [MissionEntity]})
  @Get(':id')
  getMissionByID(@Param('id') id: number) {
    return this.missionService.getMissionById(id)
  }

  @ApiOperation({summary: "Update Mission"})
  @ApiResponse({status: 200, type: [MissionEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(':id')
  updateMission(@Param('id') id: number, @Body() missionDTO: CreateMissionDto) {
    return this.missionService.updateMission(id, missionDTO)
  }

  @ApiOperation({summary: "Delete Mission"})
  @ApiResponse({status: 200, description: 'The mission was updated successfully!'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteMission(@Param('id') id: number) {
    return this.missionService.deleteMission(id)
  }

  @ApiOperation({summary: "Set Award From Mission"})
  @ApiResponse({status: 200, description: 'You get 100 coins from mission'})
  @Put('set_award/:id/:award')
  setAward(@Param('id') userId: number, @Param('award') award: number) {
    return this.missionService.setAward(userId, award)
  }

  @ApiOperation({summary: "Set Award From Mission"})
  @ApiResponse({status: 200, description: 'You get 100 coins from mission'})
  @UseGuards(JwtAuthGuard)
  @Put('set_done/:id')
  updateIsDone(@Request() req: any, @Param('id') missionId: number) {
    const userId = req.user.id
    return this.missionService.updateIsDone(userId ,missionId)
  }

}
