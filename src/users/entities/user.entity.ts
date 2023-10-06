import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {RoleEntity} from "../../roles/entities/role.entity";


@Entity('Users')
export class UserEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => RoleEntity, {eager: true})
  @JoinTable({name: 'user_roles'})
  roles: RoleEntity[];

}
