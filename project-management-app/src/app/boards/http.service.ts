import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { Board, Column, Task } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://127.0.0.1:3000';

  headers = new HttpHeaders({
    'accept' : 'application/json',
    'Authorization': `Bearer ${this.auth.getToken()}`
  })
  requestOptions = { headers: this.headers };

  constructor
    (
      private http:HttpClient,
      private auth:AuthService
    ){}


  getBoardList() {
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, this.requestOptions)
  }

  addBoard(boardTitle: string) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })

    const board = {
      "title": boardTitle,
      "owner": "string",
      "users": [
        "string"
      ]
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards`, board, this.requestOptions)
  }

  removeAllBoards() {
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, this.requestOptions).subscribe(res => {
      res.forEach(item => {
        this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${item._id}`, this.requestOptions).subscribe()
      })
    })
  }

  getBoardColumns(id: string) {
    return this.http.get<Array<Column>>(`${this.baseUrl}/boards/${id}/columns`, this.requestOptions)
  }

  addColumn(title: string, boardId: string, order: number) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })

    const column = {
      "title": title,
      "order": order,
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns`, column, this.requestOptions)
  }

  updateColumnSet(columns: Column[]) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    let newCol =  columns.map(({ _id, order }) => ({ _id, order }))
    return this.http.patch<Array<{_id: string, order: number}[]>>(`${this.baseUrl}/columnsSet`, newCol, this.requestOptions)
  }

  removeColumn(colId: string, boardId: string) {
    return this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns/${colId}`, this.requestOptions)
  }

  addTask(title: string, description: string, boardId: string, colId: string, order: number) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    const task = {
      "title": title,
      "order": order,
      "description": description,
      "userId": this.auth.userId as string,
      "users": []
    }
    return this.http.post<Array<Task>>(`${this.baseUrl}/boards/${boardId}/columns/${colId}/tasks`, task, this.requestOptions)
  }

  getTasksSet(boardId: string){
    return this.http.get<Array<Task>>(`${this.baseUrl}/tasksSet/${boardId}`, this.requestOptions)
  }

  updateTasksSet(set: Task[]){
    let updateTaskOrder =  set.map(({ _id, order, columnId }) => ({ _id, order, columnId }))
    return this.http.patch<Array<Task>>(`${this.baseUrl}/tasksSet`, updateTaskOrder, this.requestOptions)
  }

  getColumnTasks(columnId: string, boardId: string) {
    console.log(boardId, 'boardId', columnId, 'columnId')
    return this.http.get<Array<Task>>(`${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks`, this.requestOptions)
  }
  
  updateTask(title: string, description: string, task: Task){
    console.log(task.boardId, 'task.boardId')
    let result = {
      "title": title,
      "order": task.order,
      "description": description,
      "columnId": task.columnId,
      "userId": task.userId,
      "users": task.users
    }
    return this.http.put<Task>(`${this.baseUrl}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`, result , this.requestOptions)
  }

  removeTask(task: Task) {
    return this.http.delete<Task>(`${this.baseUrl}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`, this.requestOptions)
  }

  updateColumn(title: string, column: Column) {
    let result = {
      "title": title,
      "order": column.order,
    }
    return this.http.put<Column>(`${this.baseUrl}/boards/${column.boardId}/columns/${column._id}`, result , this.requestOptions)
  }
}
