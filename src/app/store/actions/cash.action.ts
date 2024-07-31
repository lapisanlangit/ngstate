import { Cash } from '../models/cash';

export class InsertArrayCash {
  static readonly type = '[Cash] InsertArray Cash ';

  constructor(public payload: any) { }
}

export class AddCash {
  static readonly type = '[Cash] Add Cash ';

  constructor(public payload: Cash) { }
}

export class UpdateCash {
  static readonly type = '[Cash] Update Cash ';

  constructor(public payload: Cash) { }
}

export class DeleteCash {
  static readonly type = '[Cash] Delete Cash ';

  constructor(public payload: string) { }
}

export class InserArrayCashAPI {
  static readonly type = '[Cash] InsertArray Cash API ';

  constructor(public payload: string) { }
}

export class AddCashAPI {
  static readonly type = '[Cash] Add Cash API ';

  constructor(public payload: Cash) { }
}

export class UpdateCashAPI {
  static readonly type = '[Cash] Update Cash API';

  constructor(public payload: Cash) { }
}

export class DeleteCashAPI {
  static readonly type = '[Cash] Delete Cash  API';

  constructor(public payload: Cash) { }
}
