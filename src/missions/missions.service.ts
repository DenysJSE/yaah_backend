import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MissionEntity} from "./entities/mission.entity";
import {Repository} from "typeorm";
import {CreateMissionDto} from "./dto/create-mission.dto";

@Injectable()
export class MissionsService {

  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionRepository: Repository<MissionEntity>
  ) {}

  async createMission(missionDTO: CreateMissionDto) {
    const existMission = await this.missionRepository.findOne({
      where: {title: missionDTO.title}
    })

    if (existMission) {
      throw new ConflictException('The mission already exist!')
    }

    const mission = this.missionRepository.create(missionDTO)
    await this.missionRepository.save(mission)

    return mission
  }

  async getAllMission() {
    return this.missionRepository.find()
  }

  async getMissionById(id: number) {
    const mission = await this.missionRepository.findOne({where: {id}})

    if (!mission) {
      throw new BadRequestException(`The mission by ID: ${id} was not found!`)
    }

    return mission
  }

  async updateMission(id: number, missionDTO: CreateMissionDto) {
    const mission = await this.missionRepository.findOne({
      where: {id}
    })

    if (!mission) {
      throw new BadRequestException(`The mission by ID: ${id} not exist!`)
    }

    mission.title = missionDTO.title
    mission.description = missionDTO.description
    mission.award = missionDTO.award

    await this.missionRepository.save(mission)

    return mission
  }

  async deleteMission(id: number) {
    const mission = await this.missionRepository.findOne({
      where: {id}
    })

    if (!mission) {
      throw new BadRequestException(`The mission by ID: ${id} not exist!`)
    }

    await this.missionRepository.delete(mission)

    return 'The mission was deleted successful!'
  }

}
