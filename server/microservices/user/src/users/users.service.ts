import { Inject, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UserDTO } from 'src/dto/users.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { ID } from '../../../notification/src/dto/ID';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private UserModel: Model<User>){}
  create(user : UserDTO) {
    const newUser = {
      ...user,
      name: 'unnamed',
      image: `linear-gradient(45deg, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
    }
    const createdUser = new this.UserModel(newUser)
    console.log(createdUser)
    return createdUser.save()
  }

  get() : Promise<User[]> {
    return this.UserModel.find().exec()
  }

  getUser(id: ID) : Promise<UserDTO>{
    return 
  }

  update(id: ID) {

  }

  async archive(id: ID): Promise<void> {
   
  }
}
