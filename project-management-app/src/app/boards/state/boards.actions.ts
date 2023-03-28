import { createAction, props } from "@ngrx/store";
import { Board, Column } from "./boards.state";


export const updateBoardsAction = createAction('update boards',  props<{ boards: Board[] }>())
export const updateColumnsAction = createAction('update columns',  props<{ columns: Column[] }>())
