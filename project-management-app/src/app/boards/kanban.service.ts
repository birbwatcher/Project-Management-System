import { Injectable } from '@angular/core';
import { ModalServiceService } from '../core/modal/modal-service.service';

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
  id: string,
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
  }

  getBoard(id: string) {
    let boardIndex = this.boards.findIndex(item => item.id === id)
    this.currentBoard = this.boards[boardIndex];
  }

  addColumn(column:IColumn) {
    this.currentBoard.columns.push(column)
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
  }
}
