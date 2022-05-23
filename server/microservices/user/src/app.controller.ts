import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ID } from '../../notification/src/dto/ID';
import { UserDTO } from './dto/users.dto';
import { User } from './schemas/user.schema';

const logger = new Logger('Main');

@Controller()
export class UserController {
  

  

}
