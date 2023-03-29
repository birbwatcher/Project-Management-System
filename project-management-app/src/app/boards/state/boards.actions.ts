import { createAction, props } from "@ngrx/store";
import { Board, Column } from "./boards.state";
import { Task } from "../kanban.service";


export const updateBoardsAction = createAction('update boards',  props<{ boards: Board[] }>())
export const updateColumnsAction = createAction('update columns',  props<{ columns: Column[] }>())
export const updateTasksAction = createAction('update tasks',  props<{ tasks: Task[] }>())
