import {forwardRef, Module} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubjectEntity} from "./entities/subject.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectEntity]),
    forwardRef(() => AuthModule)
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
