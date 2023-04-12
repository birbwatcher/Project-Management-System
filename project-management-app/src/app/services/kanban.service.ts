import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateBoardsAction, updateColumnsAction, updateTasksAction } from '../boards/state/boards.actions';
import { State, UserResponse } from '../models/app.models';
import { Observable, filter, map, tap, toArray } from 'rxjs';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Board, Column, Task } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  actualBoard: Board[] | null = null;
  actualBoardId: string | null = null;

  boardList:Board[] = [];

  myBoardsList$: Observable<Board[]>
  myActualBoard$: Observable<Column[]>;
  myActualBoardLen: number = 0;
  myActualBoardTasks$: Observable<Task[]>
  allUsers: UserResponse[] = [];
  currentUserBoards$: Observable<Board[]>
  currentUserAssignedBoards$: Observable<Board[]>
  searchResults$: Observable<Task[]>;

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
  this.currentUserBoards$ = this.store.select(res => res.boards.boards.filter(item => item.owner === this.auth.getCurrentUserId()));
  this.currentUserAssignedBoards$ = this.store.select(res => res.boards.boards.filter(item => item.users.includes(this.auth.getCurrentUserId())));
  }

  updateStore() {
    if (this.auth.isLogged()) {
      this.httpService.getBoardList().subscribe(res => {
        return this.store.dispatch(updateBoardsAction({boards : res}))
      });
    }
  }

  addBoard(boardTitle: string, users: UserResponse[]) {
    this.auth.getUserId()
    this.updateStore()
    return this.httpService.addBoard(boardTitle, users)
  }

  removeAllBoards() {
    return this.httpService.removeAllBoards()
  }

  removeBoard(id: string) {
    this.httpService.removeBoard(id)
    this.updateStore()
    this.httpService.getBoardList().subscribe(res => {
      return this.store.dispatch(updateBoardsAction({boards : res}))
    });
  }

  getBoardColumns(id: string){
    this.getAllUsers();
    this.httpService.getBoardColumns(id).subscribe(res => {
      return this.store.dispatch(updateColumnsAction({columns: res.sort((a, b) => a.order > b.order ? 1 : -1)}))
    })
  }

  addColumn(title: string) {
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

  removeColumn(colId: string, boardId: string) {
    this.httpService.removeColumn(colId, boardId).subscribe()
    this.getBoardColumns(this.actualBoardId as string);
  }

  addTask(title: string, description: string, colId: string, order: number, users: UserResponse[]) {
    this.auth.getUserId()
    this.httpService.addTask(title, description, this.actualBoardId as string, colId, order, users).subscribe()
    this.getTasksSet()
    this.httpService.getTasksSet(this.actualBoardId as string).subscribe(result => {
      return this.store.dispatch(updateTasksAction({tasks: result.sort((a, b) => a.order > b.order ? 1 : -1)}))
    })
  }

  editTask(title: string, description: string, task:Task, users: UserResponse[]) {
    this.httpService.updateTask(title, description, task, users).subscribe()
    this.getTasksSet()
  }

  editColumn(title: string, column: Column) {
    this.httpService.updateColumn(title, column).subscribe()
    this.getBoardColumns(this.actualBoardId as string);
  }

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

  deleteTask(task: Task){
    this.httpService.removeTask(task).subscribe()
    this.getTasksSet()
    this.httpService.getTasksSet(this.actualBoardId as string).subscribe(result => {
      return this.store.dispatch(updateTasksAction({tasks: result.sort((a, b) => a.order > b.order ? 1 : -1)}))
    })
  }

  getAllUsers() {
    this.httpService.getAllUsers().subscribe(res => this.allUsers = res)
  }
}
