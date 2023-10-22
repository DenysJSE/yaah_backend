import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MissionEntity} from "./entities/mission.entity";
import {Repository} from "typeorm";
import {CreateMissionDto} from "./dto/create-mission.dto";
import {UserEntity} from "../users/entities/user.entity";
import {UserMissionEntity} from "../users/entities/user-mission.entity";

@Injectable()
export class MissionsService {

  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionRepository: Repository<MissionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserMissionEntity)
    private readonly userMissionRepository: Repository<UserMissionEntity>
  ) {}

  /**
   * @param missionDTO - title, description, award
   */
  async createMission(missionDTO: CreateMissionDto) {
    const existMission = await this.missionRepository.findOne({
      where: {title: missionDTO.title}
    })

    if (existMission) {
      throw new BadRequestException('The mission already exist!')
    }

    const mission = this.missionRepository.create(missionDTO)
    const savedMission = await this.missionRepository.save(mission)

    const users = await this.userRepository.find()

    const userMissions = users.map(user => ({
      user,
      mission: savedMission,
      isDone: false
    }))

    await this.userMissionRepository.insert(userMissions)

    return savedMission
  }

  async getAllMissionsWithUserStatus() {
    const missions = await this.missionRepository.find({
      relations: ['userMissions', 'userMissions.user']
    });

    return missions.map(missions => ({
      id: missions.id,
      title: missions.title,
      description: missions.description,
      award: missions.award,
      userStatus: missions.userMissions.map(userMission => ({
        userId: userMission.user,
        isDone: userMission.isDone,
      })),
    }));
  }

  async getAllMission(userId: number) {
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['userMissions', 'userMissions.mission'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user.userMissions
  }

  async getMissionById(id: number) {
    const mission = await this.missionRepository.findOne({where: {id}})

    if (!mission) {
      throw new BadRequestException(`The mission by ID: ${id} was not found!`)
    }

    return mission
  }

  /**
   * @param id - missionID
   * @param missionDTO - title, description, award
   */
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

  async updateIsDone(userID: number, missionID: number) {

    const user = await this.userRepository.findOne({
      where: {id: userID}
    })

    const mission = await this.missionRepository.findOne({
      where: {id: missionID}
    })

    if (!user || !mission) {
      throw new BadRequestException('User or mission not found!')
    }

    const userMission = await this.userMissionRepository.findOne({
      where: {user, mission}
    })

    if (!userMission) {
      throw new BadRequestException('UserMission was not found!')
    }

    if (userMission.isDone) {
      throw new BadRequestException('The mission is already done!')
    }

    userMission.isDone = true

    await this.setAward(user.id, mission.award)

    return await this.userMissionRepository.save(userMission)
  }



  async setAward(userID: number, awardAmount: number) {
    const user = await this.userRepository.findOne({
      where: {id: userID}
    })

    if (!user) {
      throw new BadRequestException('The user was not found!')
    }

    user.coins += Number(awardAmount)

    return await this.userRepository.save(user)
  }

}
