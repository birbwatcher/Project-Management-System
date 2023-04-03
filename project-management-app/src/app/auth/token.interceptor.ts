import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ModalServiceService } from "../core/modal/modal-service.service";

@Injectable({
    providedIn: 'root'
  })
  export class TokenInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService,
                private router: Router,
                private modal:ModalServiceService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        if (!this.auth.isLogged()) {
                // console.log('token is expired!!!')
                this.auth.removeToken();
                this.router.navigate(['/sign-in']);
                // console.log('hola')
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                  console.log('problem with the token')
                //   this.auth.removeToken();
                  return throwError(() => 'ggg')
                }
                return throwError(() => 'oo');
              })
        )
    }


  }
