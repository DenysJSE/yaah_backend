import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, Length} from "class-validator";

export class CreateMissionDto {

  @ApiProperty({
    example: "Pass 3 exams",
    description: "The title of mission"
  })
  @IsNotEmpty()
  @Length(3)
  readonly title: string;

  @ApiProperty({
    example: "You need to pass 3 exams to end of the day to earn award",
    description: "The description of mission"
  })
  @IsNotEmpty()
  @Length(3)
  readonly description: string;

  @ApiProperty({
    example: "200",
    description: "The award which user earn after finish the mission"
  })
  @IsNotEmpty()
  @IsNumber()
  readonly award: number;

}
