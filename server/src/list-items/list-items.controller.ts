import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Observable, of, delay } from 'rxjs';
import { ListItemsService } from './list-items.service';
import { Item } from '../interfaces/common.interfaces';

@Controller('list-items')
export class ListItemsController {
  constructor(private listItemsService: ListItemsService) {
  }

  @Get()
  getListItems(): Observable<Item[]> {
    return of([
      {id: 0, name: 'item1', checked: false},
      {id: 1, name: 'item2', checked: false},
      {id: 2, name: 'item3', checked: false},
      {id: 3, name: 'item4', checked: false},
      {id: 4, name: 'item5', checked: false},
      {id: 5, name: 'item6', checked: false}
    ]);
  }

  @Put()
  setListItems(@Body() payload:Item[]): Observable<Item[]> {
    console.log('setting the items', payload);
    const randomTimeToWaitWithAnswer = Math.floor(Math.random() * 1000);
    this.listItemsService.persistNewList(payload);
    return of(payload).pipe(delay(randomTimeToWaitWithAnswer));
  }
}
