import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListItemsController } from './list-items/list-items.controller';
import { ListItemsService } from "./list-items/list-items.service";

@Module({
  imports: [],
  controllers: [AppController, ListItemsController],
  providers: [AppService, ListItemsService],
})
export class AppModule {}
