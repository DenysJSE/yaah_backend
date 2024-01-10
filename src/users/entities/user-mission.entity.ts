import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {MissionEntity} from "../../missions/entities/mission.entity";


@Entity('UserMission')
export class UserMissionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.userMissions, {onDelete: "CASCADE"})
  user: UserEntity;

  @ManyToOne(() => MissionEntity, mission => mission.userMissions)
  mission: MissionEntity;

  @Column({ default: false })
  isDone: boolean;

}