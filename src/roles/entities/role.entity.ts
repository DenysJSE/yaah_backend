import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../../users/entities/user.entity";


@Entity('Roles')
export class RoleEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "USER",
    description: "The role of user"
  })
  @Column()
  value: string;

  @ApiProperty({
    example: "Role of user is User",
    description: "The description of user"
  })
  @Column()
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

}
