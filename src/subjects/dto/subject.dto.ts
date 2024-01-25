import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Length, Matches} from "class-validator";

export class SubjectDto {

  @ApiProperty({
    example: "English Language",
    description: "The name of the subject"
  })
  @Matches(/^[A-Za-z\s]+$/)
  @IsNotEmpty()
  @Length(3)
  readonly title: string;

  @ApiProperty({
    example: "The most popular language in the world",
    description: "The description of the subject"
  })
  @IsNotEmpty()
  @Length(3)
  readonly description: string;

  @ApiProperty({
    example: 10,
    description: "The amount of the lessons"
  })
  readonly lessonsNumber: number;

  @ApiProperty({
    example: 10,
    description: "The amount of the exams"
  })
  readonly examsNumber: number;
}
