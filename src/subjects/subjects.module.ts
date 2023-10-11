import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubjectEntity} from "./entities/subject.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectEntity])
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
