
export interface State {
    boards: BState
}

export interface BState {
    boards: Board[]
}


export interface Board {
    _id: string,
    title: string,
    owner: string,
    users: string[]
  }

export const initialBoardsState: BState = {
    boards: [],
}
