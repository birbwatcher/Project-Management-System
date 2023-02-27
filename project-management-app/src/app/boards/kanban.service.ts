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
  currentBoard = this.boards[0];

  constructor() {}

  addBoard(board:IBoard) {
    this.boards.push(board);
    console.log(this.boards);
  }

  getBoard(id: number) {
    let boardIndex = this.boards.findIndex(item => item.id === id)
    this.currentBoard = this.boards[boardIndex];
    console.log(this.currentBoard, 'this current board')
  }

  addColumn(column:IColumn) {
    this.currentBoard.columns.push(column)
    console.log(this.boards);
  }

  getColumnIndex(columnId: string):number {
    return this.currentBoard.columns.findIndex(item => item.id === columnId);
  }

  getColumnTasks(id: string){
    let columnIndex = this.currentBoard.columns.findIndex(item => item.id === id);
    // console.log(this.currentBoard.columns[columnIndex].tasks, 'this one')
    return this.currentBoard.columns[columnIndex].tasks
  }

  removeColumn(id: string) {
    this.currentBoard.columns = this.currentBoard.columns.filter(item => item.id != id)
  }

  addTask(task:ITask, columnId: string) {
    const columnIndex = this.currentBoard.columns.findIndex(item => item.id === columnId)
    this.currentBoard.columns[columnIndex].tasks.push(task)
    console.log(this.boards);
  }
}
