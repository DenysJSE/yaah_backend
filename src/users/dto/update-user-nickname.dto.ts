import {PartialType} from '@nestjs/mapped-types';
import {RegistrationUserDto} from './registration-user.dto';
import {IsNotEmpty, IsNumber, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserNicknameDto extends PartialType(RegistrationUserDto) {

  @ApiProperty({
    example: 1,
    description: "The ID of the user"
  })
  @IsNotEmpty()
  @IsNumber()
  userID: number

  @ApiProperty({
    example: "Denys1111",
    description: "The new nickname of the user"
  })
  @IsNotEmpty()
  @Length(3)
  newNickname: string

}
