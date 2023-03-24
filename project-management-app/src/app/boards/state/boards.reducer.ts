import { createReducer, on } from "@ngrx/store";
import { initialBoardsState } from "./boards.state";
import { updateBoardsAction } from "./boards.actions";

export const updateBoardReducer = createReducer(
    initialBoardsState,
    on(updateBoardsAction, (state, { boards }) => {return {...state, boards}})
)
