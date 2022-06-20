import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [ClientsModule.register(
    [{
      name: "CATEGORY_SERVICE",
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1400
      },
      
    },
    {
      name: "NOTIFICATION_SERVICE",
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 1234
      }
    }]
  )],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [ClientsModule]
})
export class CategoryModule {}
