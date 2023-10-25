import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, Length, Matches} from "class-validator";

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
  @IsNumber()
  @IsNotEmpty()
  readonly lessonsNumber: number;

  @ApiProperty({
    example: 10,
    description: "The amount of the exams"
  })
  @IsNumber()
  @IsNotEmpty()
  readonly examsNumber: number;

  @ApiProperty({
    example: 5,
    description: "The time which student should spent to finish the subject course"
  })
  @IsNumber()
  @IsNotEmpty()
  readonly courseDuration: number;

}
