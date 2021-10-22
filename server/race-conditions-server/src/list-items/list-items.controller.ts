import { Controller, Get } from '@nestjs/common';

@Controller('list-items')
export class ListItemsController {
  @Get()
  getListItems() {
    return [
      {id: 0, itemName: 'item1'},
      {id: 0, itemName: 'item2'},
      {id: 0, itemName: 'item3'},
      {id: 0, itemName: 'item4'},
      {id: 0, itemName: 'item5'},
      {id: 0, itemName: 'item6'}
    ];
  }
}
