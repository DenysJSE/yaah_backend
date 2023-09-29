import {ApiProperty} from "@nestjs/swagger";

export class CreateSubjectDto {

  @ApiProperty({
    example: "English Language",
    description: "The name of the subject"
  })
  readonly name: string;

  @ApiProperty({
    example: "The most popular language in the world",
    description: "The description of the subject"
  })
  readonly description: string;

  @ApiProperty({
    example: "10",
    description: "The amount of the lessons"
  })
  readonly lessonsNumber: number;

  @ApiProperty({
    example: "10",
    description: "The amount of the exams"
  })
  readonly testsNumber: number;

  @ApiProperty({
    example: "15",
    description: "The time which student should spent to finish the subject course"
  })
  readonly courseDuration: number;

}
