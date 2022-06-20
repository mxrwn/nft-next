import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { REPL_MODE_STRICT } from 'repl';
import { ID } from 'src/dto/ID.dto';
import { UserDTO } from 'src/dto/users.dto';
import { User } from 'src/schemas/user.schema';
import { Activity } from 'src/schemas/activity.schema';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private UserModel: Model<User>, @Inject('ACTIVITY_MODEL') private ActivityModel: Model<Activity>){}
  async create(user : UserDTO) {
    const newUser = {
      ...user,
      name: 'unnamed',
      image: `linear-gradient(45deg, rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}), rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}))`
    }
    console.log(newUser)
    const s = await this.UserModel.findOne({ wallet: newUser.wallet });
    console.log(s)
    if(s !== null && s.wallet as unknown as ID === newUser.wallet) return s;
    const createdUser = new this.UserModel(newUser)
    return createdUser.save()
  }

  get() : Promise<User[]> {
    return this.UserModel.find().exec()
  }

  getUser(wallet: ID) {
    return this.UserModel.findOne({wallet: wallet}).exec()
  }

  update(id: ID) {

  }

  async archive(id: ID): Promise<void> {
   
  }

  getActivities(wallet: ID) {
    return this.ActivityModel.find({wallet: wallet}).exec()
  }
  createActivity(data: any) {
    const newActivity = {
      ...data,
      image: '',

    }
    const createdAcitivity = new this.ActivityModel(newActivity)
    return createdAcitivity.save()
  } 
}
