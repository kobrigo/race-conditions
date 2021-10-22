import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListItemsController } from './list-items/list-items.controller';

@Module({
  imports: [],
  controllers: [AppController, ListItemsController],
  providers: [AppService],
})
export class AppModule {}
