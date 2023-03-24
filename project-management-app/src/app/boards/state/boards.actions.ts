import { createAction, props } from "@ngrx/store";
import { Board } from "./boards.state";


export const updateBoardsAction = createAction('update boards',  props<{ boards: Board[] }>())
