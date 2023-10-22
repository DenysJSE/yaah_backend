import {
  Column,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {RoleEntity} from "../../roles/entities/role.entity";
import {UserLessonEntity} from "./user-lesson.entity";
import {UserMissionEntity} from "./user-mission.entity";
import {UserExamEntity} from "./user-exam.entity";


@Entity('Users')
export class UserEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Denys123",
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
    example: "123456",
    description: "The password of the user"
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 100,
    description: 'The amount of user coins'
  })
  @Column({default: 0})
  coins: number;

  @ApiProperty({
    type: () => RoleEntity,
    isArray: true,
    description: 'Role of User'
  })
  @ManyToMany(() => RoleEntity, {eager: true})
  @JoinTable({name: 'user_roles'})
  roles: RoleEntity[];

  @OneToMany(() => UserLessonEntity, userLesson => userLesson.user)
  userLessons: UserLessonEntity[];

  @OneToMany(() => UserMissionEntity, userMission => userMission.user)
  userMissions: UserMissionEntity[];

  @OneToMany(() => UserExamEntity, userExam => userExam.exam)
  userExams: UserExamEntity[];

}
