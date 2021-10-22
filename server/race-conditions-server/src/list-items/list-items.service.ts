import { Injectable } from '@nestjs/common';
import { Observable } from "rxjs";
import { Item } from "../interfaces/common.interfaces";

@Injectable()
export class ListItemsService {
  public currentServerState: Item[];

  persistNewList(items: Item[]) {
    this.currentServerState = items;
    console.log(`current state: ${this.currentServerState}`);
  };
}
