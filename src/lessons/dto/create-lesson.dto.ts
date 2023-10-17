import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, Length} from "class-validator";

export class CreateLessonDto {

  @ApiProperty({
    example: "Past Simple",
    description: "The title of lesson"
  })
  @IsNotEmpty()
  @Length(3)
  readonly title: string

  @ApiProperty({
    example: "Past Simple is the basic form of the past tense in Modern English",
    description: "The data of lesson"
  })
  @IsNotEmpty()
  @Length(3)
  readonly lessonData: string

  @ApiProperty({
    example: "1",
    description: "The ID of subject which will contain lessons"
  })
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;
}
