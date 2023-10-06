import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Length} from "class-validator";

export class CreateRoleDto {

  @ApiProperty({
    example: "ADMIN",
    description: "The role of User"
  })
  @IsNotEmpty()
  @Length(3)
  readonly value: string;

  @ApiProperty({
    example: "Role of user is Administrator",
    description: "The description of user"
  })
  @IsNotEmpty()
  @Length(3)
  readonly description: string;

}
