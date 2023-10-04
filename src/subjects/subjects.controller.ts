import { Controller } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {}
