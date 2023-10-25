import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, Length, Matches} from "class-validator";

export class CreateLessonDto {

  @ApiProperty({
    example: "Past Simple",
    description: "The title of lesson"
  })
  @Matches(/^[A-Za-z0-9-\s]*$/)
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

  @ApiProperty({
    example: "200",
    description: "The award which user earn after finish the lesson"
  })
  @IsNotEmpty()
  @IsNumber()
  readonly award: number;

}
