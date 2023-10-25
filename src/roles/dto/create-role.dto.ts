import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Length, Matches} from "class-validator";

export class CreateRoleDto {

  @ApiProperty({
    example: "USER",
    description: "The role of User"
  })
  @IsNotEmpty()
  @Length(3)
  @Matches(/^[A-Za-z_]+$/)
  readonly value: string;

  @ApiProperty({
    example: "Role of user is User",
    description: "The description of user"
  })
  @IsNotEmpty()
  @Length(3)
  readonly description: string;

}
