import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity('Missions')
export class MissionEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Finish 3 exams",
    description: "Title of the mission"
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Finish to the end of the day 3 exams",
    description: "Description of the mission"
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "200",
    description: "The award which user earn after finish the mission"
  })
  @Column()
  award: number;

  @ApiProperty({
    example: "true",
    description: "User done or not mission - true/false"
  })
  @Column()
  isDone: boolean;

}
