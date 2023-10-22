import {IsNotEmpty, IsNumber, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateExamDto {

  @ApiProperty({
    example: "Past Simple",
    description: "The title of exam"
  })
  @IsNotEmpty()
  @Length(3, 255)
  title: string

  @ApiProperty({
    example: "Past Simple is a time in English language",
    description: "The title of exam"
  })
  @IsNotEmpty()
  @Length(3)
  description: string;

  @ApiProperty({
    example: "200",
    description: "The award which user earn after finish the exam"
  })
  @IsNotEmpty()
  @IsNumber()
  readonly award: number;

  @ApiProperty({
    example: "1",
    description: "The ID of subject which will contain exams"
  })
  @IsNumber()
  @IsNotEmpty()
  subjectId: number;

}