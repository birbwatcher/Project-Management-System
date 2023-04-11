import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ModalServiceService } from "./modal-service.service";

@Injectable({
    providedIn: 'root'
  })
  export class TokenInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService,
                private router: Router,
                private modal:ModalServiceService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        if (!this.auth.isLogged()) {
                this.auth.removeToken();
                this.router.navigate(['/sign-in']);
        }
        return next.handle(request)
        .pipe(tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           return;
          }
          this.modal.showError(err);
        }
      }));
    }


  }
