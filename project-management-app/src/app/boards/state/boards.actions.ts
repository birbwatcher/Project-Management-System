import { createAction, props } from "@ngrx/store";
import { Board, Column, Task } from "src/app/models/app.models";

export const updateBoardsAction = createAction('update boards',  props<{ boards: Board[] }>())
export const updateColumnsAction = createAction('update columns',  props<{ columns: Column[] }>())
export const updateTasksAction = createAction('update tasks',  props<{ tasks: Task[] }>())
