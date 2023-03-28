import { createReducer, on } from "@ngrx/store";
import { initialBoardsState } from "./boards.state";
import { updateBoardsAction, updateColumnsAction } from "./boards.actions";

export const updateBoardReducer = createReducer(
    initialBoardsState,
    on(updateBoardsAction, (state, { boards }) => {return {...state, boards}}),
    on(updateColumnsAction, (state, { columns }) => {return {...state, columns}})
)
