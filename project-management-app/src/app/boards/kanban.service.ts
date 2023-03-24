import { Injectable, OnInit } from '@angular/core';
import { ModalServiceService } from '../core/modal/modal-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { select, Store } from '@ngrx/store';
import { updateBoardsAction } from './state/boards.actions';
import { State } from '../boards/state/boards.state'
import { state } from '@angular/animations';

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

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private baseUrl = 'http://127.0.0.1:3000';

  boards:IBoard[] = [];
  currentBoard = this.boards[0];

  boardList:Board[] = [];

  constructor(private http:HttpClient,
              private auth:AuthService,
              private store: Store<State>) {}

  updateStore() {
    this.getBoardList().subscribe(res => {
      return this.store.dispatch(updateBoardsAction({boards : res}))
    });
  }

  getBoardList() {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
    const requestOptions = { headers: headers };
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, requestOptions)
  }

  addBoard(boardTitle: string) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    const requestOptions = { headers: headers };
    const board = {
      "title": boardTitle,
      "owner": "string",
      "users": [
        "string"
      ]
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards`, board, requestOptions)
  }

  removeAllBoards() {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
    const requestOptions = { headers: headers };
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, requestOptions).subscribe(res => {
      res.forEach(item => {
        this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${item._id}`, requestOptions).subscribe()
      })
    })

  }

  getBoard(id: string) {
    let boardIndex = this.boards.findIndex(item => item.id === id)
    this.currentBoard = this.boards[boardIndex];
    console.log(this.currentBoard, 'this current boards')
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

  // superPuper() {
  //   this.store.pipe(select(res => this.boardList = res.boards.boards)).subscribe();
  // }
}
