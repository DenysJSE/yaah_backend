import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateOptionDto {

  @ApiProperty({
    example: "Past Simple is a time in English language",
    description: "The question of exam"
  })
  @IsNotEmpty()
  @Length(3, 255)
  text: string

  @ApiProperty({
    example: "1",
    description: "The ID of question which contain these options"
  })
  @IsNotEmpty()
  questionID: number

  @ApiProperty({
    example: true,
    description: "The option is correct or not - true/false"
  })
  @IsNotEmpty()
  isCorrect: boolean

}