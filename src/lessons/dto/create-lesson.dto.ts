import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateLessonDto {

  @ApiProperty({
    example: "Past Simple",
    description: "The title of lesson"
  })
  readonly title: string

  @ApiProperty({
    example: "Past Simple is the basic form of the past tense in Modern English",
    description: "The data of lesson"
  })
  readonly lessonData: string

  @ApiProperty({
    example: "1",
    description: "The ID of subject which will contain lessons"
  })
  @IsNumber()
  @IsNotEmpty()
  subjectId: number;
}
