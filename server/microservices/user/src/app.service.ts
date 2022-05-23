import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../src/dto/ID.dto';
import { UserDTO } from './dto/users.dto';
import { User, UserDocument } from './schemas/user.schema';

const logger = new Logger('User Service')

@Injectable()
export class AppService {
  

  

}
