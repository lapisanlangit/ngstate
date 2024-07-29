import {
  State,
  Action,
  StateContext,
  Selector,
  UpdateState,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Cash } from '../models/cash';
import { CashService } from '../../cash.service';
import { Desa } from '../models/desa';
import { RetrieveDesa } from '../actions/desa.action';

export class DesaStateModel {
  desas: Desa[] = [];
}

@State<DesaStateModel>({
  name: 'desas',
  defaults: {
    desas: [],
  },
})
@Injectable()
export class DesaState {
  constructor(private cashservice: CashService) {}

  @Selector()
  static getDesas(state: DesaStateModel) {
    return state.desas;
  }

  @Action(RetrieveDesa)
  retrievedesaApi(
    { getState, patchState }: StateContext<DesaStateModel>,
    {}: RetrieveDesa,
  ) {
    return this.cashservice.retrieveDesa().pipe(
      tap((result: any) => {
        if (result.error == 'false') {
          const state = getState();
          if (state.desas.length == 0) {
            for (let index = 0; index < result.data.length; index++) {
              const state = getState();
              patchState({
                desas: [...state.desas, result.data[index]],
              });
            }
          }
        }
      }),
    );
  }
}
