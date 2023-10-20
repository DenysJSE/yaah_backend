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

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
      throw new BadRequestException('The user already exist')
    }

    const user = this.userRepository.create(createUserDto)
    const role = await this.roleService.getRoleByValue("USER")

    user.roles = [role]

    return await this.userRepository.save(user)
  }

  async getAllUsers() {
    return await this.userRepository.find({relations: ['roles']})
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {email},
      relations: ['roles']
    })
  }

  /**
   * @param addRoleDto - value, userID
   */
  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: {id: addRoleDto.userID}
    })
    const role = await this.roleService.getRoleByValue(addRoleDto.value)

    if (!user || !role) {
      throw new BadRequestException('User or role are not found');
    }

    if (!user.roles) {
      user.roles = [];
    }

    user.roles.push(role);

    await this.userRepository.save(user)

    return addRoleDto;

  }

  /**
   * @param updateUserDto - userID, newNickname
   */
  async updateNickname(updateUserDto: UpdateUserNicknameDto) {
    const user = await this.userRepository.findOne({
      where: {id: updateUserDto.userID}
    })

    if (!user) {
      throw new BadRequestException('The user is not found!')
    }

    user.nickname = updateUserDto.newNickname

    await this.userRepository.save(user)

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

}
