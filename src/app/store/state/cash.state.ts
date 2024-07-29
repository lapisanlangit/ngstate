import {
  State,
  Action,
  StateContext,
  Selector,
  UpdateState,
} from '@ngxs/store';
import {
  AddCash,
  UpdateCash,
  DeleteCash,
  RetrieveCash,
  RetrieveCashAPI,
  AddCashAPI,
  UpdateCashAPI,
  DeleteCashAPI,
} from '../actions/cash.action';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Cash } from '../models/cash';
import { CashService } from '../../cash.service';

export class CashStateModel {
  cashs: Cash[] = [];
}

@State<CashStateModel>({
  name: 'cashs',
  defaults: {
    cashs: [],
  },
})
@Injectable()
export class CashState {
  constructor(private cashservice: CashService) {}

  @Selector()
  static getCashs(state: CashStateModel) {
    return state.cashs;
  }

  @Action(RetrieveCash)
  retrievecash(ctx: StateContext<CashStateModel>, action: RetrieveCash) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      cashs: [
        {
          ...state.cashs[0],
          ...action.payload,
        },
      ],
    });
  }

  @Action(AddCash)
  addcash(
    { getState, patchState }: StateContext<CashStateModel>,
    { payload }: AddCash
  ) {
    const state = getState();
    patchState({
      cashs: [...state.cashs, payload],
    });
  }

  @Action(UpdateCash)
  updatecash(
    { getState, setState }: StateContext<CashStateModel>,
    { payload }: UpdateCash
  ) {
    const state = getState();
    const todoList = [...state.cashs];
    const todoIndex = todoList.findIndex(
      (item) => item.tanggal === payload.tanggal
    );
    todoList[todoIndex] = payload;
    setState({
      ...state,
      cashs: todoList,
    });
  }
  @Action(DeleteCash)
  deletecash(
    { getState, setState }: StateContext<CashStateModel>,
    { payload }: DeleteCash
  ) {
    const state = getState();
    const filteredArray = state.cashs.filter(
      (item) => item.tanggal !== payload
    );
    setState({
      ...state,
      cashs: filteredArray,
    });
  }

  @Action(RetrieveCashAPI)
  retrievecashApi(
    { getState, patchState }: StateContext<CashStateModel>,
    { payload }: RetrieveCashAPI
  ) {
    return this.cashservice.retrieveCash(payload).pipe(
      tap((result: any) => {
        if (result.error == 'false') {
          const state = getState();
          if (state.cashs.length == 0) {
            patchState({
              cashs: [...state.cashs, result.data],
            });
          }
        }
      })
    );
  }

  @Action(AddCashAPI)
  addcashApi(
    { getState, patchState }: StateContext<CashStateModel>,
    { payload }: AddCashAPI
  ) {
    return this.cashservice.addCash(payload).pipe(
      tap((result: any) => {
        if (result.error == 'false') {
          const state = getState();
          patchState({
            cashs: [...state.cashs, payload],
          });
        }
      })
    );
  }

  @Action(UpdateCashAPI)
  updatecashApi(
    { getState, setState }: StateContext<CashStateModel>,
    { payload }: UpdateCashAPI
  ) {
    return this.cashservice.updateCash(payload).pipe(
      tap((result: any) => {
        if (result.error == 'false') {
          const state = getState();
          const todoList = [...state.cashs];
          const todoIndex = todoList.findIndex(
            (item) => item.tanggal === payload.tanggal
          );
          todoList[todoIndex] = payload;
          setState({
            ...state,
            cashs: todoList,
          });
        }
      })
    );
  }
  @Action(DeleteCashAPI)
  deletecashApi(
    { getState, setState }: StateContext<CashStateModel>,
    { payload }: DeleteCashAPI
  ) {
    return this.cashservice.deleteCash(payload).pipe(
      tap((result: any) => {
        if (result.error == 'false') {
          const state = getState();
          const filteredArray = state.cashs.filter(
            (item) => item.tanggal !== payload.tanggal
          );
          setState({
            ...state,
            cashs: filteredArray,
          });
        }
      })
    );
  }
}
