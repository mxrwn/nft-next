import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ID } from 'src/dto/ID.dto';
import { UserDTO } from 'src/dto/users.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern('create_user')
  async createUser(data: UserDTO): Promise<User> {
    return this.usersService.create(data)
  }

  @MessagePattern('update_user')
  async updateUser(data: UserDTO): Promise<User[]> {
    return this.usersService.get();
  }

  @MessagePattern('get_user')
  async getUser(wallet: ID): Promise<User> {
    return this.usersService.getUser(wallet)
  }

  @MessagePattern('get_users')
  async getUsers() : Promise<User[]> {
    return this.usersService.get()
  }

  @MessagePattern('get_activities')
  async getActivities(wallet: ID) : Promise<any> {
    return this.usersService.getActivities(wallet)
  }

  @MessagePattern('create_activity')
  async createActivity(activity: any) : Promise<any> {
    return this.usersService.createActivity(activity)
  }
}
