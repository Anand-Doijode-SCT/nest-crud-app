import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Get user by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user: User = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  // Create User
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // Update User
  @Put(':id')
  async update(@Param(':id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  // Delete User
  @Delete(':id')
  async delete(@Param(':id') id: number): Promise<any> {
    // Handle error is user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }
}
