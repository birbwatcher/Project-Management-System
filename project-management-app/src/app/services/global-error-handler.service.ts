import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ModalServiceService } from './modal-service.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private modal:ModalServiceService, private zone: NgZone) {}

  handleError(error: any): void {
    this.zone.run(() => {
      if (error.status != 401) {
        this.modal.showError(error)
      }
    })
  }
}
