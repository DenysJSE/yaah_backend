import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RoleEntity} from "./entities/role.entity";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: "Create a Role"})
  @ApiResponse({status: 201, type: [RoleEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto)
  }

  @ApiOperation({summary: "Find a Role By Value"})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('/:value')
  getRolesByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value)
  }

  @ApiOperation({summary: "Update a Role"})
  @ApiResponse({status: 200, type: [RoleEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('/:id')
  updateRole(@Param('id') id: number, @Body() roleDto: CreateRoleDto) {
    return this.rolesService.updateRole(id, roleDto)
  }

  @ApiOperation({summary: "Delete a Role"})
  @ApiResponse({status: 200, description: 'The role was deleted successfully'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('/:id')
  deleteRole(@Param('id') id: number) {
    return this.rolesService.delete(id)
  }

}
