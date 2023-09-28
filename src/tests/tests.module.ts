import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity, QuestionEntity, OptionEntity]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
