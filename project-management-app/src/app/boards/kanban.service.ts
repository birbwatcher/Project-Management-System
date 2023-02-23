import { Injectable } from '@angular/core';

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
}

export interface IColumn {
  id: string,
  title: string,
  order: number,
  tasks: ITask[],
}

export interface IBoard {
  id: number,
  title: string,
  description: string,
  columns: IColumn[]
}

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  boards:IBoard[] = [];

  constructor() { }

  addBoard(board:IBoard) {
    this.boards.push(board);
    console.log(this.boards);
  }

  addColumn(column:IColumn) {
    this.boards[0].columns.push(column)
    console.log(this.boards);
  }

  getColumnIndex(columnId: string):number {
    return this.boards[0].columns.findIndex(item => item.id === columnId);
  }

  removeColumn(id: string) {
    this.boards[0].columns = this.boards[0].columns.filter(item => item.id != id)
  }

  addTask(task:ITask, columnId: string) {
    const columnIndex = this.boards[0].columns.findIndex(item => item.id === columnId)
    this.boards[0].columns[columnIndex].tasks.push(task)
    console.log(this.boards);
  }
}
