import { Component, OnInit } from '@angular/core';
import { StoreService } from "../services/store.service";
import { Observable, Subject } from "rxjs";
import { ApiService } from "../services/api.service";
import { switchMap, tap, map, concatMap, mergeMap } from "rxjs/operators";
import { Item } from "../interfaces/common.interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'race-conditions-client';
  public listItems$: Observable<Item[]>;

  //the stream of events from the click
  private checkBoxClickStream: Subject<any> = new Subject<any>();

  constructor(private store: StoreService, private apiService: ApiService) {
    this.listItems$ = store.state$;
    this.apiService.getListOfItemsServer().subscribe();
  }

  ngOnInit(): void {
    this.apiService.getListOfItems().subscribe((items: Item[]) => {
      this.store.setState(items);
    });

    this.setupStreamOfEvents();
  }
  //Using a read server

  setupStreamOfEvents() {
    // The steam of event but still with the problem
    this.checkBoxClickStream.pipe(
      map((item: Item) => {
        console.log('update the store');

        const currentState = this.store.getState();
        const newDataToStore = [...currentState];
        const indexToReplace = currentState.findIndex(i => i.id === item.id);
        const newItem = {
          ...item,
          checked: !item.checked
        };

        newDataToStore.splice(indexToReplace, 1, newItem)
        this.store.setState(newDataToStore);
        return newDataToStore
      }),
      switchMap((newDataToStore: Item[]) => {
        console.log('sending the data to the server');
        return this.apiService.setListOfItemsServer(newDataToStore)
      }),
    ).subscribe();
  }

  onCheckClicked(item: Item) {
    this.checkBoxClickStream.next(item);
  }

/*
  //Using the store as the source of truth solve the issue
  setupStreamOfEvents() {
    // The steam of event but still with the problem
    this.checkBoxClickStream.pipe(
      map((item: Item) => {
        console.log('update the store');

        const currentState = this.store.getState();
        const newDataToStore = [...currentState];
        const indexToReplace = currentState.findIndex(i => i.id === item.id);
        const newItem = {
          ...item,
          checked: !item.checked
        };

        newDataToStore.splice(indexToReplace, 1, newItem)
        this.store.setState(newDataToStore);
        return newDataToStore
      }),
      switchMap((newDataToStore: Item[]) => {
        console.log('sending the data to the server');
        return this.apiService.setListOfItems(newDataToStore)
      }),
    ).subscribe();
  }

  onCheckClicked(item: Item) {
    this.checkBoxClickStream.next(item);
  }
*/

  /*
    setupStreamOfEvents() {
      // The steam of event but still with the problem
      this.checkBoxClickStream.pipe(
        switchMap((item: Item) => {
          const currentState = this.store.getState();
          const newDataToStore = [...currentState];
          const indexToReplace = currentState.findIndex(i => i.id === item.id);
          const newItem = {
            ...item,
            checked: !item.checked
          };
          newDataToStore.splice(indexToReplace, 1, newItem)

          console.log('sending the data to the server');
          return this.apiService.setListOfItems(newDataToStore)

        }),
        tap((items: Item[]) => {
          console.log('update the store');
          this.store.setState(items);
        })
      ).subscribe();
    }

    onCheckClicked(item: Item) {
      this.checkBoxClickStream.next(item);
    }
  */

/* //Without any stream of events.
  setupStreamOfEvents() {}

  onCheckClicked(item: Item) {
    const currentState = this.store.getState();
    const newDataToStore = [...currentState];
    const indexToReplace = currentState.findIndex(i => i.id === item.id);
    const newItem = {
      ...item,
      checked: !item.checked
    };
    newDataToStore.splice(indexToReplace,1,newItem)

    this.apiService.setListOfItems(newDataToStore).subscribe((items: Item[]) => {
      this.store.setState(items);
    });
  }
*/
}
