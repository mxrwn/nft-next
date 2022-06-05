import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Palette } from './interfaces/Palette';
import { URL } from './interfaces/URL';

const logger = new Logger('MAIN')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('generate-palette')
  getPalette(image: URL): Promise<Palette> {
    logger.log(image)
    return this.appService.generatePalette(image)
  }
}
