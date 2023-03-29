import { createReducer, on } from "@ngrx/store";
import { initialBoardsState } from "./boards.state";
import { updateBoardsAction, updateColumnsAction, updateTasksAction } from "./boards.actions";

export const updateBoardReducer = createReducer(
    initialBoardsState,
    on(updateBoardsAction, (state, { boards }) => {return {...state, boards}}),
    on(updateColumnsAction, (state, { columns }) => {return {...state, columns}}),
    on(updateTasksAction, (state, { tasks }) => {return {...state, tasks}})
)
