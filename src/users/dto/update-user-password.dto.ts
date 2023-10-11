import {PartialType} from "@nestjs/mapped-types";
import {RegistrationUserDto} from "./registration-user.dto";
import {IsNotEmpty, IsNumber, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserPasswordDto extends PartialType(RegistrationUserDto) {

  @ApiProperty({
    example: 1,
    description: "The ID of the user"
  })
  @IsNotEmpty()
  @IsNumber()
  userID: number

  @ApiProperty({
    example: "123456",
    description: "The previous password of the user"
  })
  @IsNotEmpty()
  @Length(6, 20)
  userPassword: string

  @ApiProperty({
    example: "111111",
    description: "The new password of the user"
  })
  @IsNotEmpty()
  @Length(6, 20)
  newUserPassword: string

}