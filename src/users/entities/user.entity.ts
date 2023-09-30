import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity('Users')
export class UserEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  ID: number;

  @ApiProperty({
    example: "Nickname",
    description: "The nickname of the user"
  })
  @Column()
  nickname: string

  @ApiProperty({
    example: "email@gmail.com",
    description: "The email of the user"
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "12345",
    description: "The password of the user"
  })
  @Column()
  password: string;

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
