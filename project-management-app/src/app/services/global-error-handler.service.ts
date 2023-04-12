import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ModalServiceService } from './modal-service.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../core/modal/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private modal:ModalServiceService, private zone: NgZone) { 
    
  }

  handleError(error: any): void {
    console.log(error, 'there is an error')
    this.zone.run(() => {
      if (error.status != 401) {
        this.modal.showError(error)
      }
    })
  }
}
