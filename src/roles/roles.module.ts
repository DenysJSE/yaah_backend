import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./entities/role.entity";
import {UserEntity} from "../users/entities/user.entity";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserEntity])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
