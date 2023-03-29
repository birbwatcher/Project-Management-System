import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board, Column, KanbanService, Task } from './kanban.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://127.0.0.1:3000';

  headers = new HttpHeaders({
    'accept' : 'application/json',
    'Authorization': `Bearer ${this.auth.getToken()}`
  })

  constructor(private http:HttpClient,
              private auth:AuthService
             ) { }

  // getBoard(id: string) {
  //   const requestOptions = { headers: this.headers };
  //   return this.http.get<Array<Board>>(`${this.baseUrl}/boards/${id}`, requestOptions)
  // }

  getBoardList() {
    const requestOptions = { headers: this.headers };
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
    const requestOptions = { headers: this.headers };
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards`, requestOptions).subscribe(res => {
      res.forEach(item => {
        this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${item._id}`, requestOptions).subscribe()
      })
    })
  }

  getBoardColumns(id: string) {
    const requestOptions = { headers: this.headers };
    return this.http.get<Array<Column>>(`${this.baseUrl}/boards/${id}/columns`, requestOptions)
  }

  addColumn(title: string, boardId: string, order: number) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    const requestOptions = { headers: headers };
    const column = {
      "title": title,
      "order": order,
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns`, column, requestOptions)
  }

  updateColumnSet(columns: Column[]) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    const requestOptions = { headers: headers };
    let newCol =  columns.map(({ _id, order }) => ({ _id, order }))
    return this.http.patch<Array<{_id: string, order: number}[]>>(`${this.baseUrl}/columnsSet`, newCol, requestOptions)
  }

  removeColumn(colId: string, boardId: string) {
    const requestOptions = { headers: this.headers };
    return this.http.delete<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns/${colId}`, requestOptions)
  }

  addTask(title: string, boardId: string, colId: string, order: number) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    const requestOptions = { headers: headers };
    const task = {
      "title": title,
      "order": order,
      "description": 'description',
      "userId": 0,
      "users": []
    }
    return this.http.post<Array<Task>>(`${this.baseUrl}/boards/${boardId}/columns/${colId}/tasks`, task, requestOptions)
  }

  getTasksSet(boardId: string){
    const requestOptions = { headers: this.headers };
    return this.http.get<Array<Task>>(`${this.baseUrl}/tasksSet/${boardId}`, requestOptions)
  }

  updateTasksSet(set: Task[]){
    const requestOptions = { headers: this.headers };
    let updateTaskOrder =  set.map(({ _id, order }) => ({ _id, order }))
    return this.http.patch<Array<Task>>(`${this.baseUrl}/tasksSet`, updateTaskOrder, requestOptions)
  }
  
}
