import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ID } from 'src/dto/ID.dto';
import { UserDTO } from 'src/dto/users.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @MessagePattern('create_user')
  async createUser(data: UserDTO): Promise<User> {
    return this.userService.create(data)
  }

  @MessagePattern('update_user')
  async updateUser(data: UserDTO): Promise<User[]> {
    return this.userService.get();
  }

  @MessagePattern('get_user')
  async getUser(id: ID): Promise<UserDTO> {
    return this.userService.getUser(id)
  }

  @MessagePattern('get_users')
  async getUsers() : Promise<User[]> {
    return this.userService.get()
  }
}
