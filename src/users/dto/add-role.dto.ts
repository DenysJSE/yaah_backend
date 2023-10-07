import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Length} from "class-validator";

export class AddRoleDto {

  @ApiProperty({
    example: "USER",
    description: "The value of role"
  })
  @IsNotEmpty()
  @Length(3)
  readonly value: string;

  @ApiProperty({
    example: "1",
    description: "The ID of User"
  })
  @IsNotEmpty()
  readonly userID: number;
}