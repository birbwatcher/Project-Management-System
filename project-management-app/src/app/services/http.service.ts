import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, finalize, map, throwError } from 'rxjs';
import { Board, Column, Task, User, UserResponse } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://127.0.0.1:3000';
  isLoading = false;

  getHeaders() {
    let requestOptions
    let headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    })
    return requestOptions = { 'headers': headers };
  }
  constructor
    (
      private http:HttpClient,
      private auth:AuthService
    ){}


  getBoardList() {
    this.isLoading = true;
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  addBoard(boardTitle: string, users: UserResponse[]) {
    this.isLoading = true;
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })

    let usersResult = users.map((item) => item._id)

    const board = {
      "title": boardTitle,
      "owner": this.auth.userId as string,
      "users": usersResult
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards`, board, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  removeAllBoards() {
    this.isLoading = true;
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, this.getHeaders()).subscribe(res => {
      res.forEach(item => {
        this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${item._id}`, this.getHeaders()).pipe(
          finalize(() => {
            this.isLoading = false;
          })).subscribe()
      })
    })
  }

  removeBoard(id: string) {
    this.isLoading = true;
    return this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${id}`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      })).subscribe()
  }

  getBoardColumns(id: string) {
    this.isLoading = true;
    return this.http.get<Array<Column>>(`${this.baseUrl}/boards/${id}/columns`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  addColumn(title: string, boardId: string, order: number) {
    this.isLoading = true;
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })

    const column = {
      "title": title,
      "order": order,
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns`, column, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  updateColumnSet(columns: Column[]) {
    this.isLoading = true;
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    let newCol =  columns.map(({ _id, order }) => ({ _id, order }))
    return this.http.patch<Array<{_id: string, order: number}[]>>(`${this.baseUrl}/columnsSet`, newCol, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  removeColumn(colId: string, boardId: string) {
    this.isLoading = true;
    return this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns/${colId}`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  addTask(title: string, description: string, boardId: string, colId: string, order: number, users: UserResponse[]) {
    this.isLoading = true;
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })

    let usersResult = users.map((item) => item._id)

    const task = {
      "title": title,
      "order": order,
      "description": description,
      "userId": this.auth.userId as string,
      "users": usersResult
    }
    return this.http.post<Array<Task>>(`${this.baseUrl}/boards/${boardId}/columns/${colId}/tasks`, task, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  getTasksSet(boardId: string){
    this.isLoading = true;
    return this.http.get<Array<Task>>(`${this.baseUrl}/tasksSet/${boardId}`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  updateTasksSet(set: Task[]){
    this.isLoading = true;
    let updateTaskOrder =  set.map(({ _id, order, columnId }) => ({ _id, order, columnId }))
    return this.http.patch<Array<Task>>(`${this.baseUrl}/tasksSet`, updateTaskOrder, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  getColumnTasks(columnId: string, boardId: string) {
    this.isLoading = true;
    return this.http.get<Array<Task>>(`${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }
  
  updateTask(title: string, description: string, task: Task, users: UserResponse[]){
    this.isLoading = true;
    let usersResult = users.map((item) => item._id)

    let result = {
      "title": title,
      "order": task.order,
      "description": description,
      "columnId": task.columnId,
      "userId": task.userId,
      "users": usersResult
    }
    return this.http.put<Task>(`${this.baseUrl}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`, result , this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  removeTask(task: Task) {
    this.isLoading = true;
    return this.http.delete<Task>(`${this.baseUrl}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  updateColumn(title: string, column: Column) {
    this.isLoading = true;
    let result = {
      "title": title,
      "order": column.order,
    }
    return this.http.put<Column>(`${this.baseUrl}/boards/${column.boardId}/columns/${column._id}`, result , this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  getAllUsers(){
    this.isLoading = true;
    return this.http.get<Array<UserResponse>>(`${this.baseUrl}/users`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  getUserName(id: string) {
    this.isLoading = true;
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }

  getSearchResults(request: string) {
    this.isLoading = true;
    return this.http.get<Task[]>(`${this.baseUrl}/tasksSet?search=${request}`, this.getHeaders()).pipe(
      finalize(() => {
        this.isLoading = false;
      }))
  }
}
