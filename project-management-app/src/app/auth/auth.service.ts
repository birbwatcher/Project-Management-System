import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';


// interface User {
//   name: string,
//   username: string,
//   password: string
// }

interface UserResponse {
  _id: string,
  name: string,
  login: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private baseUrl = 'http://127.0.0.1:3000';
  private tokenKey: null | string = null;
  private username: null | string = null;

  constructor(private http: HttpClient) {}

  signup(name: string, login: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, {"name": name, "login": login, "password": password})
  }

  login(username: string, password: string): Observable<{token: string}> {
     return this.http.post<{token: string}>(`${this.baseUrl}/auth/signin`, {
      "login": username,
      "password": password
    }).pipe(
      tap(
        ({token}) => {
          this.tokenKey = token;
          this.username = username;
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
        }
      )
    )
  }

  isLogged(): boolean {
    return !!this.tokenKey
  }

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.tokenKey = null;
    this.username = null;
  }
  
  authorize() {
    this.tokenKey = localStorage.getItem('token') as string;
    this.username = localStorage.getItem('username') as string;
  }

  getUserId() {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.tokenKey}`
    })
    const requestOptions = { headers: headers };
    return this.http.get<Array<UserResponse>>('http://127.0.0.1:3000/users', requestOptions).subscribe(resolve => {
      resolve.forEach(item => {
        if (item.login === this.username) {
          console.log(item._id)
          return item._id
        }
        return;
      })
    })
  }

  getUserName() {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.tokenKey}`
    })
    const requestOptions = { headers: headers };
    return this.http.get<Array<UserResponse>>('http://127.0.0.1:3000/users', requestOptions)
  }

  getCurrentUser() {
    return this.username;
  }

  getUser() {

  }
}
