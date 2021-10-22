import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import { Item } from "../interfaces/common.interfaces";
import { HttpClient } from "@angular/common/http";

const initialListOfItemsFromTheServerMock = [
  {id: 0, name: 'item1', checked: false},
  {id: 1, name: 'item2', checked: false},
  {id: 2, name: 'item3', checked: false},
  {id: 3, name: 'item4', checked: false},
  {id: 4, name: 'item5', checked: false},
  {id: 5, name: 'item6', checked: false}
]

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public currentStateOfTheServer: Item[] = initialListOfItemsFromTheServerMock;

  constructor(private httpClient: HttpClient) {
  }

  public getListOfItems(): Observable<Item[]> {
    return of(this.currentStateOfTheServer);
  }

  public setListOfItems(itemsToSave: Item[]): Observable<Item[]> {
    const randomTimeToWaitWithAnswer = Math.floor(Math.random() * 1000);
    return of(itemsToSave).pipe(
      map(origItems => JSON.parse(JSON.stringify(itemsToSave))), //clone to simulate an actual server response
      tap((items) => {
        this.currentStateOfTheServer = items;
      }),
      delay(randomTimeToWaitWithAnswer)
    );
  }

  public setListOfItemsServer(itemsToSave: Item[]): Observable<void> {
    const url = `/list-items`;
    return this.httpClient.put<void>(url, itemsToSave);
  }

  public getListOfItemsServer(): Observable<Item[]> {
    const url = `/list-items`;
    return this.httpClient.get<Item[]>(url);
  }
}
