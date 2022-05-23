import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ID } from 'src/dto/ID.dto';
import { UserDTO } from 'src/dto/users.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}
  @MessagePattern('create_user')
  async createUser(data: UserDTO): Promise<User> {
    return this.appService.create(data)
  }

  @MessagePattern('update_user')
  async updateUser(data: UserDTO): Promise<User[]> {
    return this.appService.get();
  }

  @MessagePattern('get_user')
  async getUser(wallet: ID): Promise<User> {
    return this.appService.getUser(wallet)
  }

  @MessagePattern('get_users')
  async getUsers() : Promise<User[]> {
    return this.appService.get()
  }
}
