import {ApiProperty} from "@nestjs/swagger";

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
    example: "Done",
    description: "The status of lesson - Done or Not Done"
  })
  readonly status: string

}
