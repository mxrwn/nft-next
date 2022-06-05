import { Injectable } from '@nestjs/common';
import * as palette from 'image-palette'
import * as pixels from 'image-pixels'
import { Palette } from './interfaces/Palette';
import { URL } from './interfaces/URL';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generatePalette(image: URL) : Promise<Palette> {
    const {ids, colors, amount} = palette(await pixels(image), 10)
    return colors as Palette
  }
}
