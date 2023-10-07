import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RoleEntity} from "./entities/role.entity";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: "Create a Role"})
  @ApiResponse({status: 201, type: [RoleEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter role value or length of role value is less than 3 character. ' +
      'User does not enter description or length of description is less than 3 character'
  })
  @ApiResponse({status: 409, description: 'The role already exist'})
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto)
  }

  @ApiOperation({summary: "Find a Role By Value"})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @ApiResponse({status: 404, description: 'Role is not found'})
  @Get('/:value')
  getRolesByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value)
  }

}
