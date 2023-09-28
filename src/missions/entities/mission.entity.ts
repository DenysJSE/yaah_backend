import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
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
    example: "Finish 3 tests",
    description: "Title of the mission"
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Finish to the end of the day 3 tests",
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

  @ApiProperty({
    example: "23.05.23",
    description: "Date when lesson was created"
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "25.05.23",
    description: "Date when lesson was updated"
  })
  @UpdateDateColumn()
  updatedAt: Date;

}
