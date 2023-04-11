export interface State {
    boards: BState
}

export interface BState {
    boards: Board[]
    columns: Column[]
    tasks: Task[]
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

  export interface Task {
    _id: string,
    title: string,
    order: number,
    boardId: string,
    columnId: string,
    description: string,
    userId:	number,
    users: string[]
  }

  export interface User {
    name: string,
    login: string,
    password: string
  }
  
  export interface UserResponse {
    _id: string,
    name: string,
    login: string
  }
