import {IsNotEmpty, Length} from "class-validator";

export class CreateTestDto {

  @IsNotEmpty({message: 'The test should have a title'})
  @Length(3, 255)
  title: string

  @IsNotEmpty({message: 'The test should have a description'})
  @Length(3)
  description: string

}