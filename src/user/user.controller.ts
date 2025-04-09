import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { EmailAlreadyRegistered } from 'src/errors/userNotFound.error';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      throw new EmailAlreadyRegistered();
    }
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
