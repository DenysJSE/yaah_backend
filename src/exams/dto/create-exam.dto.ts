import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateExamDto {

  @ApiProperty({
    example: "Past Simple",
    description: "The title of exam"
  })
  @IsNotEmpty({message: 'The exam should have a title'})
  @Length(3, 255)
  title: string

  @ApiProperty({
    example: "Past Simple is a time in English language",
    description: "The title of exam"
  })
  @IsNotEmpty({message: 'The exam should have a description'})
  @Length(3)
  description: string

}