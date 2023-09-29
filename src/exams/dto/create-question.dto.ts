import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateQuestionDto {

  @ApiProperty({
    example: "What is a Past Simple?",
    description: "The title of lesson"
  })
  @IsNotEmpty()
  @Length(3, 255)
  question: string

  @ApiProperty({
    example: "1",
    description: "The ID of exam which contain this question"
  })
  @IsNotEmpty()
  examID: number

}