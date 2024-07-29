import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CashState } from './store/state/cash.state';
import { Observable, take } from 'rxjs';
import { Cash } from './store/models/cash';
import {
  AddCash,
  DeleteCash,
  RetrieveCash,
  UpdateCash,
} from './store/actions/cash.action';
import { StateReset } from '@simfyz/ngxs-reset-plugin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ngstate';

  listCash: Cash[];
  @Select(CashState.getCashs) cashs$: Observable<any>;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  retrieveData() {
    let nilai = [
      {
        tanggal: '2023-12-01',
        nilai: 500,
      },
      {
        tanggal: '2023-12-02',
        nilai: 600,
      },
    ];
    this.store.dispatch(new RetrieveCash(nilai)).subscribe({
      next: async () => {},
      error: async (error) => {},
    });
  }
  isikanStore(nilai: Cash) {
    this.store.dispatch(new AddCash(nilai)).subscribe({
      next: async () => {},
      error: async (error) => {},
    });
  }

  updateStore(nilai: Cash) {
    this.store.dispatch(new UpdateCash(nilai)).subscribe({
      next: async () => {},
      error: async (error) => {},
    });
  }

  deleteStore(tanggal: string) {
    this.store.dispatch(new DeleteCash(tanggal)).subscribe({
      next: async () => {},
      error: async (error) => {},
    });
  }

  tampilkanData() {
    this.cashs$.pipe(take(1)).subscribe((data) => {
      this.listCash = data;
    });
  }

  resetStore() {
    this.store.dispatch(new StateReset(CashState));
  }
}
