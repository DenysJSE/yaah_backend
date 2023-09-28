import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({
    example: "Nickname",
    description: "The nickname of the user"
  })
  readonly nickname: string;

  @ApiProperty({
    example: "email@gmail.com",
    description: "The email of the user"
  })
  readonly email: string;

  @ApiProperty({
    example: "12345",
    description: "The password of the user"
  })
  readonly password: string;

}
