import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CashState } from './store/state/cash.state';
import { Observable, take } from 'rxjs';
import { Cash } from './store/models/cash';
import {
  AddCash,
  DeleteCash,
  InsertArrayCash,
  UpdateCash,
} from './store/actions/cash.action';
import { StateReset } from '@simfyz/ngxs-reset-plugin';
import { RetrieveDesa } from './store/actions/desa.action';
import { DesaState } from './store/state/desa.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ngstate';

  listCash: Cash[];

  dataContoh = [
    {
      tanggal: '2023-12-01',
      nilai: 100,
    },
    {
      tanggal: '2023-12-02',
      nilai: 200,
    },
    {
      tanggal: '2023-12-03',
      nilai: 100,
    },
  ];

  @Select(CashState.getCashs) cashs$: Observable<any>;
  @Select(DesaState.getDesas) desas$: Observable<any>;
  constructor(private store: Store) { }

  ngOnInit(): void { }

  retrieveData() {
    this.store.dispatch(new InsertArrayCash(this.dataContoh)).subscribe({
      next: async () => { },
      error: async (error) => { },
    });

    // this.store.dispatch(new RetrieveDesa()).subscribe({
    //   next: async () => {},
    //   error: async (error) => {},
    // });
  }

  tampilkanData() {
    this.cashs$.pipe(take(1)).subscribe((data) => {
      this.listCash = data;
    });
  }

  isikanStore(nilai: Cash) {
    this.store.dispatch(new AddCash(nilai)).subscribe({
      next: async () => { },
      error: async (error) => { },
    });
  }

  updateStore(nilai: Cash) {
    this.store.dispatch(new UpdateCash(nilai)).subscribe({
      next: async () => { },
      error: async (error) => { },
    });
  }

  deleteStore(tanggal: string) {
    this.store.dispatch(new DeleteCash(tanggal)).subscribe({
      next: async () => { },
      error: async (error) => { },
    });
  }

  resetStore() {
    this.store.dispatch(new StateReset(CashState, DesaState));
  }
}
