import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { RegistrationUserDto } from './dto/registration-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {UpdateUserNicknameDto} from "./dto/update-user-nickname.dto";
import {UpdateUserPasswordDto} from "./dto/update-user-password.dto";
import * as bcrypt from 'bcrypt'
import {LessonEntity} from "../lessons/entities/lesson.entity";
import {UserLessonEntity} from "./entities/user-lesson.entity";
import {UserExamEntity} from "./entities/user-exam.entity";
import {ExamEntity} from "../exams/entities/exam.entity";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    @InjectRepository(UserLessonEntity)
    private readonly userLessonRepository: Repository<UserLessonEntity>,
    @InjectRepository(UserExamEntity)
    private readonly userExamRepository: Repository<UserExamEntity>,
    private roleService: RolesService
  ) {}

  /**
   * @param createUserDto - nickname, email, password
   */
  async create(createUserDto: RegistrationUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      },
      relations: ['roles']
    })

    if (existUser) {
      throw new BadRequestException('The user with such email already exist')
    }

    const existNicknameUser = await this.userRepository.findOne({
      where: {
        nickname: createUserDto.nickname
      },
      relations: ['roles']
    })
    if (existNicknameUser) {
      throw new BadRequestException('The nickname is already taken')
    }

    const user = this.userRepository.create(createUserDto)
    const role = await this.roleService.getRoleByValue("USER")

    user.roles = [role]

    const existingLessons = await this.lessonRepository.find();
    const userLessons = existingLessons.map((lesson) => ({
      user,
      lesson,
      isDone: false,
    }));

    const existingExams = await this.examRepository.find();
    const userExams = existingExams.map((exam) => ({
      user,
      exam,
      isDone: false,
    }));

    await this.userRepository.save(user);
    await this.userLessonRepository.insert(userLessons);
    await this.userExamRepository.insert(userExams);

    return user
  }

  async getAllUsers() {
    const user = await this.userRepository.find({
      relations: ['roles'],
      order: {
        id: "ASC"
      }
    })

    user.map(users => {
      delete users.password
    })

    return user
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {email},
      relations: ['roles']
    })
  }

  async getUserByID(id: number) {
    return await this.userRepository.findOne({
      where: {id},
      relations: ['roles']
    })
  }

  /**
   * @param addRoleDto - value, userID
   */
  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: {id: addRoleDto.userID},
      relations: ['roles']
    })
    const role = await this.roleService.getRoleByValue(addRoleDto.value)

    if (!user || !role) {
      throw new BadRequestException('User not found');
    }

    const alreadyHasRole = user.roles.some((userRole) => userRole.id === role.id);

    if (alreadyHasRole) {
      throw new BadRequestException('User already has this role');
    }

    if (!user.roles) {
      user.roles = [];
    }

    user.roles.push(role);

    await this.userRepository.save(user);

    delete user.password

    return user
  }

  /**
   * @param updateUserDto - userID, newNickname
   */
  async updateNickname(updateUserDto: UpdateUserNicknameDto) {
    const existNickname = await this.userRepository.findOne({
      where: {nickname: updateUserDto.newNickname}
    })

    if (existNickname) {
      throw new BadRequestException('The such nickname already exist!')
    }

    const user = await this.userRepository.findOne({
      where: {id: updateUserDto.userID}
    })

    if (!user) {
      throw new BadRequestException('The user is not found!')
    }

    user.nickname = updateUserDto.newNickname

    await this.userRepository.save(user)

    delete user.password

    return user

  }

  /**
   * @param updateUserPasswordDto - userID, userPassword, newUserPassword
   */
  async updateUserPassword(updateUserPasswordDto: UpdateUserPasswordDto) {
    const user = await this.userRepository.findOne({
      where: {id: updateUserPasswordDto.userID}
    })

    if (!user) {
      throw new BadRequestException('The user is not found!')
    }

    const passwordMatches = await bcrypt.compare(updateUserPasswordDto.userPassword, user.password)

    if (!passwordMatches) {
      throw new UnauthorizedException('The password is not correct!')
    }

    user.password = await bcrypt.hash(updateUserPasswordDto.newUserPassword, 5)

    await this.userRepository.save(user)

    return 'The password was updated successfully'

  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {id}
    })

    if (!user) {
      throw new BadRequestException('The user is not found!')
    }

    await this.userRepository.delete(id)
    return `The user with ID: ${id} was deleted`
  }


  async setAward(userID: number, awardAmount: number) {
    const user = await this.userRepository.findOne({
      where: {id: userID}
    })

    if (!user) {
      throw new BadRequestException('The user was not found!')
    }

    user.coins += Number(awardAmount)

    return await this.userRepository.save(user)
  }

  async deleteRoleForUser(userId: number, roleId: number) {
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['roles']
    });

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    const role = await this.roleService.getRoleByID(roleId);

    if (!role) {
      throw new BadRequestException(`Role with ID ${roleId} not found`);
    }

    if (role.value === 'ADMIN') {
      throw new BadRequestException('You can not delete ADMIN role')
    }

    const userHasRole = user.roles.some(userRole => userRole.id == roleId);

    if (!userHasRole) {
      throw new BadRequestException(`User does not have the specified role`);
    }

    user.roles = user.roles.filter(userRole => userRole.id != roleId);

    await this.userRepository.save(user);

    return user;
  }

  async getUserRoles(userID: number) {
    const user = await this.userRepository.findOne({
      where: {id: userID},
      relations: ['roles']
    })

    if (!user) {
      throw new BadRequestException(`User with ID ${userID} not found`);
    }

    return user.roles;
  }

}
