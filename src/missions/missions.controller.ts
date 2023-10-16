import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {MissionsService} from "./missions.service";
import {CreateMissionDto} from "./dto/create-mission.dto";


@ApiTags('Missions')
@Controller('missions')
export class MissionsController {

  constructor(private readonly missionService: MissionsService) {}

  @Post()
  createMission(@Body() missionDTO: CreateMissionDto) {
    return this.missionService.createMission(missionDTO)
  }

  @Get()
  getAllMission() {
    return this.missionService.getAllMission()
  }

  @Get(':id')
  getMissionByID(@Param('id') id: number) {
    return this.missionService.getMissionById(id)
  }

  @Put(':id')
  updateMission(@Param('id') id: number, @Body() missionDTO: CreateMissionDto) {
    return this.missionService.updateMission(id, missionDTO)
  }

  @Delete(':id')
  deleteMission(@Param('id') id: number) {
    return this.missionService.deleteMission(id)
  }

}
