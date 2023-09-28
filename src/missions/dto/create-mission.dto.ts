import {ApiProperty} from "@nestjs/swagger";

export class CreateMissionDto {

  @ApiProperty({
    example: "Pass 3 tests",
    description: "The title of mission"
  })
  readonly title: string;

  @ApiProperty({
    example: "You need to pass 3 tests to end of the day to earn award",
    description: "The description of mission"
  })
  readonly description: string;

  @ApiProperty({
    example: "200",
    description: "The award which user earn after finish the mission"
  })
  readonly award: number;

  @ApiProperty({
    example: "true",
    description: "User finish test or not - true/false"
  })
  readonly isDone: boolean;

}
