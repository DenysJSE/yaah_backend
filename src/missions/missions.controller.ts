import { Controller } from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Missions')
@Controller('missions')
export class MissionsController {}
