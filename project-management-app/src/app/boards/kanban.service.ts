import { Injectable, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateBoardsAction, updateColumnsAction, updateTasksAction } from './state/boards.actions';
import { State } from '../boards/state/boards.state'
import { Observable, count, filter, map, tap, toArray } from 'rxjs';
import { HttpService } from './http.service';
import { AuthService } from '../auth/auth.service';

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
  _id: string,
  title: string,
  order: number,
  boardId: string,
  columnId: string,
  description: string,
  userId:	number,
  users: string[]
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
  myActualBoardTasks$: Observable<Task[]>

  constructor
  (
    private store: Store<State>,
    private httpService: HttpService,
    private auth: AuthService
  )
  {
  this.myBoardsList$ = this.store.select(res => res.boards.boards);
  this.myActualBoard$ = this.store.select(res => res.boards.columns)
  this.myActualBoardTasks$ = this.store.select(res => res.boards.tasks)
  }

  updateStore() {
    if (this.auth.isLogged()) {
      this.httpService.getBoardList().subscribe(res => {
        return this.store.dispatch(updateBoardsAction({boards : res}))
      });
    }
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

  // getBoard(id: string) {
  //   // let boardIndex = this.boards.findIndex(item => item.id === id)
  //   // this.currentBoard = this.boards[boardIndex];
  //   // console.log(this.currentBoard, 'this current boards')

  //   this.httpService.getBoard(id).subscribe()
  // }

  getBoardColumns(id: string){
    this.httpService.getBoardColumns(id).subscribe(res => {
      return this.store.dispatch(updateColumnsAction({columns: res.sort((a, b) => a.order > b.order ? 1 : -1)}))
    })
  }

  addColumn(title: string) {
    // this.currentBoard.columns.push(column)
    this.getBoardLen()
    this.httpService.addColumn(title, this.actualBoardId as string, this.myActualBoardLen).subscribe()
    this.getBoardColumns(this.actualBoardId as string);
  }

  getBoardLen() {
    this.myActualBoard$.subscribe(res => {this.myActualBoardLen = res.length})
  }

  getColumnLen(columnId: string){
    return this.httpService.getColumnTasks(columnId, this.actualBoardId as string)
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

  addTask(title: string, colId: string, order: number) {
    // const columnIndex = this.currentBoard.columns.findIndex(item => item.id === columnId)
    // this.currentBoard.columns[columnIndex].tasks.push(task)
    this.httpService.addTask(title, this.actualBoardId as string, colId, order).subscribe()
    this.getTasksSet()
  }

  // superPuper() {
  //   this.store.pipe(select(res => this.boardList = res.boards.boards)).subscribe();
  // }

  getTasksSet() {
    this.httpService.getTasksSet(this.actualBoardId as string).subscribe(result => {
      return this.store.dispatch(updateTasksAction({tasks: result.sort((a, b) => a.order > b.order ? 1 : -1)}))
    })
  }

  taskFilter(colId: string):Observable<Task[]> {
    return this.myActualBoardTasks$.pipe(
      filter(items => Array.isArray(items)),
      map(items => items.filter(item => item.columnId === colId))
    );
  }
}
