import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:3000';
  private tokenKey: null | string = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{token: string}> {
     return this.http.post<{token: string}>(`${this.baseUrl}/auth/signin`, {
      "login": username,
      "password": password
    }).pipe(
      tap(
        ({token}) => {
          this.tokenKey = token;
          localStorage.setItem('token', token);
        }
      )
    )
  }

  isLogged(): boolean {
    return !!this.tokenKey
  }

  getToken(): string {
    this.tokenKey = localStorage.getItem('token') as string;
    return localStorage.getItem('token') as string;
  }

  removeToken() {
    localStorage.removeItem('token');
    this.tokenKey = null;
  }
}
