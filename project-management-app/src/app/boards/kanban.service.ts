import { Injectable, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateBoardsAction } from './state/boards.actions';
import { State } from '../boards/state/boards.state'
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

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

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  // boards:IBoard[] = [];
  // currentBoard = this.boards[0];

  actualBoard: Board[] | null = null;
  actualBoardId: string | null = null;

  boardList:Board[] = [];

  myBoardsList$: Observable<Board[]>

  constructor
  (
              private store: Store<State>,
              private httpService: HttpService
  )
  {
  this.myBoardsList$ = this.store.select(res => res.boards.boards);
  }

  updateStore() {
    this.getBoardList().subscribe(res => {
      return this.store.dispatch(updateBoardsAction({boards : res}))
    });
  }

  getBoardList() {
    return this.httpService.getBoardList();
  }

  addBoard(boardTitle: string) {
    return this.httpService.addBoard(boardTitle)
  }

  removeAllBoards() {
    return this.httpService.removeAllBoards()
  }

  getBoard(id: string) {
    // let boardIndex = this.boards.findIndex(item => item.id === id)
    // this.currentBoard = this.boards[boardIndex];
    // console.log(this.currentBoard, 'this current boards')

    this.httpService.getBoard(id).subscribe()
  }

  getBoardColumns(id: string){
    return this.httpService.getBoardColumns(id).subscribe(res => {console.log(id, res); this.actualBoard = res})
  }

  addColumn(title: string) {
    // this.currentBoard.columns.push(column)
    this.httpService.addColumn(title, this.actualBoardId as string).subscribe(res => console.log(res))
  }

  getColumnIndex(columnId: string) {
    // return this.currentBoard.columns.findIndex(item => item.id === columnId);
  }

  getColumnTasks(id: string){
    // let columnIndex = this.currentBoard.columns.findIndex(item => item.id === id);
    // // console.log(this.currentBoard.columns[columnIndex].tasks, 'this one')
    // return this.currentBoard.columns[columnIndex].tasks
  }

  removeColumn(id: string) {
    // this.currentBoard.columns = this.currentBoard.columns.filter(item => item.id != id)
  }

  addTask(task:ITask, columnId: string) {
    // const columnIndex = this.currentBoard.columns.findIndex(item => item.id === columnId)
    // this.currentBoard.columns[columnIndex].tasks.push(task)
  }

  // superPuper() {
  //   this.store.pipe(select(res => this.boardList = res.boards.boards)).subscribe();
  // }
}
