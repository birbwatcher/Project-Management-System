import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ModalServiceService } from './modal-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private modal: ModalServiceService,
              private ngZone: NgZone) { 
    
  }

  handleError(error: HttpErrorResponse): void {
    console.log(error.message, 'global handler')    
  }
}
