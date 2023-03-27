import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board, Column } from './kanban.service';
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

  getBoard(id: string) {
    const requestOptions = { headers: this.headers };
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards/${id}`, requestOptions)
  }

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
    return this.http.get<Array<Board>>(`${this.baseUrl}/boards/${id}/columns`, requestOptions)
  }

  addColumn(title: string, boardId: string) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type' : 'application/json'
    })
    const requestOptions = { headers: headers };
    const column = {
      "title": title,
      "order": 0,
    }
    return this.http.post<Array<Board>>(`${this.baseUrl}/boards/${boardId}/columns`, column, requestOptions)
  }

}
