import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {RoleEntity} from "./entities/role.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async createRole(roleDto: CreateRoleDto) {

    const upperCaseRole = roleDto.value.toUpperCase()

    const existRole = await this.roleRepository.findOne({
      where: {value: upperCaseRole}
    })

    if (existRole) {
      throw new HttpException({message: 'The role already exist'}, HttpStatus.CONFLICT)
    }

    const newRole = this.roleRepository.create({...roleDto, value: upperCaseRole});
    return this.roleRepository.save(newRole);

  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({
      where: {value: value.toUpperCase()}
    })

    if (!role) {
      throw new NotFoundException('The role is not found!')
    }

    return role
  }

}
