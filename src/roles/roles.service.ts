import {BadRequestException, Injectable} from '@nestjs/common';
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

  /**
   * @param roleDto - value, description
   */
  async createRole(roleDto: CreateRoleDto) {

    const upperCaseRole = roleDto.value.toUpperCase()

    const existRole = await this.roleRepository.findOne({
      where: {value: upperCaseRole}
    })

    if (existRole) {
      throw new BadRequestException('The role already exist')
    }

    const newRole = this.roleRepository.create({...roleDto, value: upperCaseRole});
    return this.roleRepository.save(newRole);

  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({
      where: {value: value.toUpperCase()}
    })

    if (!role) {
      throw new BadRequestException('The role is not found!')
    }

    return role
  }

  /**
   * @param id - roleID
   * @param roleDto - value, description
   */
  async updateRole(id: number, roleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: {id}
    })

    if (!role) {
      throw new BadRequestException('The role is not found!')
    }

    role.value = roleDto.value
    role.description = roleDto.description

    await this.roleRepository.save(role)

    return role

  }

  async delete(id: number) {
    const role = await this.roleRepository.findOne({
      where: {id}
    })

    if (!role) {
      throw new BadRequestException('The role is not found!')
    }

    await this.roleRepository.delete(id)
    return `The role with ID: ${id} was deleted!`
  }

}
