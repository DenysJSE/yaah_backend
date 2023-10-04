import { Controller } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {}
