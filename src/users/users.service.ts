import {ConflictException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      },
      relations: ['roles']
    })

    if (existUser) {
      throw new ConflictException('The user already exist')
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

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: {id: addRoleDto.userID}
    })
    const role = await this.roleService.getRoleByValue(addRoleDto.value)

    if (!user || !role) {
      throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND);
    }

    if (!user.roles) {
      user.roles = [];
    }

    user.roles.push(role);

    await this.userRepository.save(user)

    return addRoleDto;

  }

}
