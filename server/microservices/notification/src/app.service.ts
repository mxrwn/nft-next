import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  logs = []

  getHello(): string {
    return 'Hello World!';
  }

  log(data) {
    this.logs.push('New user created ' + data.wallet);
  }

  getNotifications(): Array<any> {
    return this.logs;
  }

}
