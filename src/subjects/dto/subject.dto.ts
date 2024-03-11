import {IsNotEmpty, Length, Matches} from "class-validator";

export class SubjectDto {
  @Matches(/^[A-Za-z\s]+$/, {message: 'The name of subject must contain only letters!'})
  @IsNotEmpty()
  @Length(3)
  readonly title: string;

  @IsNotEmpty()
  @Length(3)
  readonly description: string;
}
