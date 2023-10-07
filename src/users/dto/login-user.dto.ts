import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class LoginUserDto {

  @ApiProperty({
    example: "email@gmail.com",
    description: "The email of the user"
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: "12345",
    description: "The password of the user"
  })
  @IsNotEmpty()
  @Length(6, 30)
  readonly password: string;

}
