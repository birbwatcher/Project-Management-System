import { Injectable, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateBoardsAction, updateColumnsAction } from './state/boards.actions';
import { State } from '../boards/state/boards.state'
import { Observable, count, map, tap, toArray } from 'rxjs';
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

export interface Task {
    _id:	string,
    title:	string,
    order:	number,
    boardId:	string,
    columnId:	string,
    description:	string,
    userId:	number
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
  myActualBoard$: Observable<Column[]>;
  myActualBoardLen: number = 0;

  constructor
  (
              private store: Store<State>,
              private httpService: HttpService
  )
  {
  this.myBoardsList$ = this.store.select(res => res.boards.boards);
  this.myActualBoard$ = this.store.select(res => res.boards.columns)
  }

  updateStore() {
    this.httpService.getBoardList().subscribe(res => {
      return this.store.dispatch(updateBoardsAction({boards : res}))
    });
  }

  // getBoardList() {
  //   return this.httpService.getBoardList();
  // }

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
    this.httpService.getBoardColumns(id).subscribe(res => {
      return this.store.dispatch(updateColumnsAction({columns: res.sort((a, b) => a.order > b.order ? 1 : -1)}))
    })
  }

  addColumn(title: string) {
    // this.currentBoard.columns.push(column)
    this.getColLen()
    this.httpService.addColumn(title, this.actualBoardId as string, this.myActualBoardLen).subscribe()
    this.getBoardColumns(this.actualBoardId as string);
  }

  getColLen() {
    this.myActualBoard$.subscribe(res => {this.myActualBoardLen = res.length})
  }


  getColumnIndex(columnId: string) {
    // return this.currentBoard.columns.findIndex(item => item.id === columnId);
  }

  getColumnTasks(id: string){
    // let columnIndex = this.currentBoard.columns.findIndex(item => item.id === id);
    // // console.log(this.currentBoard.columns[columnIndex].tasks, 'this one')
    // return this.currentBoard.columns[columnIndex].tasks
  }

  removeColumn(colId: string, boardId: string) {
    this.httpService.removeColumn(colId, boardId).subscribe()
    this.getBoardColumns(this.actualBoardId as string);
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
