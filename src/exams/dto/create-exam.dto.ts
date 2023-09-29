import {IsNotEmpty, Length} from "class-validator";

export class CreateExamDto {

  @IsNotEmpty({message: 'The exam should have a title'})
  @Length(3, 255)
  title: string

  @IsNotEmpty({message: 'The exam should have a description'})
  @Length(3)
  description: string

}