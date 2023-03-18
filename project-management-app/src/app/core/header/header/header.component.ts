import { Component, OnInit } from '@angular/core';
import { KanbanService } from 'src/app/boards/kanban.service';
import { IBoard } from 'src/app/boards/kanban.service';
import { ModalServiceService } from '../../modal/modal-service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 i = 1;

 boards: IBoard[] = [];

 constructor (public someService:KanbanService,
              public modalService:ModalServiceService,
              public authService: AuthService
  ) {};

  addBoard() {
    this.modalService.addBoardModal()
    this.i++;
  }
 
  getBoardId() {
    // this.someService.getBoardId()
  }

  removeToken() {
    this.authService.removeToken()
  }

  isLogged():boolean {
    return this.authService.isLogged()
  }
}
