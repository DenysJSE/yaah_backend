import {ApiProperty} from "@nestjs/swagger";
import {IsAlphanumeric, IsEmail, IsNotEmpty, Length} from "class-validator";

export class RegistrationUserDto {

  @ApiProperty({
    example: "Denys123",
    description: "The nickname of the user"
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(3,30)
  readonly nickname: string;

  @ApiProperty({
    example: "email@gmail.com",
    description: "The email of the user"
  })
  @IsEmail({}, {message: 'Incorrect format of email, check it again'})
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
