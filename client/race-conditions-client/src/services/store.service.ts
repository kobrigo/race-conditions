import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Item } from "../interfaces/common.interfaces";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  _state$: BehaviorSubject<Item[]>
  public state$: Observable<Item[]>

  constructor() {
    this._state$ = new BehaviorSubject(new Array<Item>());
    this.state$ = this._state$.asObservable();
  }

  setState(newState: Item[]) {
    this._state$.next(newState);
  }

  getState(): Item[] {
    return this._state$.getValue();
  }

  // setItemChecked(itemId: number) {
  //   const currentState = this._state$.getValue();
  //   const newState = [...currentState];
  //   indexToUpdate = newState.findIndex(item=>item.id === itemId);
  // }
}
