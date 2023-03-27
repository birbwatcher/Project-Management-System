
export interface State {
    boards: BState
}

export interface BState {
    boards: Board[]
    columns: Column[]
}


export interface Board {
    _id: string,
    title: string,
    owner: string,
    users: string[]
}

export interface Column {
    _id: string,
    title: string,
    order: number,
    boardId: string
}

export const initialBoardsState: BState = {
    boards: [],
    columns: []
}
