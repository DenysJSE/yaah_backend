import {ApiProperty} from "@nestjs/swagger";
import {IsAlpha, IsNotEmpty, IsNumber, Length} from "class-validator";

export class AddRoleDto {

  @ApiProperty({
    example: "USER",
    description: "The value of role"
  })
  @IsAlpha()
  @IsNotEmpty()
  @Length(3)
  readonly value: string;

  @ApiProperty({
    example: "1",
    description: "The ID of User"
  })
  @IsNumber()
  @IsNotEmpty()
  readonly userID: number;
}