import {forwardRef, Module} from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MissionEntity} from "./entities/mission.entity";
import {UserEntity} from "../users/entities/user.entity";
import {AuthModule} from "../auth/auth.module";
import {UserMissionEntity} from "../users/entities/user-mission.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([MissionEntity, UserEntity, UserMissionEntity]),
    forwardRef(() => AuthModule)
  ],
  controllers: [MissionsController],
  providers: [MissionsService],
  exports: [MissionsService]
})
export class MissionsModule {}
