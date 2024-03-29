import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, UserResponse } from '../models/app.models';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private baseUrl = 'https://pma-backend-production-b640.up.railway.app';
  private tokenKey: null | string = null;
  public username: null | string = null;
  public userId: null | string = null;

  constructor(private http: HttpClient, private router: Router) {}

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
          this.getUserId();
          this.router.navigate(['/dashboard'])
        }
      )
    )
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token') as string;
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Date.now() / 1000) < expiry;
    } 
    return false;
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
    return this.http.get<any[]>(`${this.baseUrl}/users`, requestOptions).subscribe(res => {
      res.forEach(item => {
        if(item.login === this.username) {
          this.userId = item._id
        }
      })
    })
  }

  getUserName() {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.tokenKey}`
    })
    const requestOptions = { headers: headers };
    return this.http.get<Array<UserResponse>>(`${this.baseUrl}/users`, requestOptions)
  }

  getCurrentUser() {
    return this.username;
  }

  getCurrentUserId() {
    let token = localStorage.getItem('token') as string;
    const id = (JSON.parse(atob(token.split('.')[1]))).id;
    return id;
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.tokenKey}`,
      'Content-Type' : 'application/json',
    })
    const requestOptions = { headers: headers };
    return this.http.put(`${this.baseUrl}/users/${this.userId}`, user ,requestOptions).subscribe()
  }

  removeUser() {
    const headers = new HttpHeaders({
      'accept' : 'application/json',
      'Authorization': `Bearer ${this.tokenKey}`,
    })
    const requestOptions = { headers: headers };
    return this.http.delete(`${this.baseUrl}/users/${this.userId}`, requestOptions).subscribe(res => this.removeToken())
  }
}
