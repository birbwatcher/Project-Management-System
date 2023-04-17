import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KanbanService } from 'src/app/services/kanban.service';
import { ModalServiceService } from '../../../services/modal-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 constructor (public kanbanService:KanbanService,
              public modalService:ModalServiceService,
              public authService: AuthService,
  ) {};

  ngOnInit(): void {
    this.updateBoards()
    
  }

  updateBoards() {
    this.kanbanService.updateStore()
  }

  addBoard() {
    if (this.authService.isLogged()) {
      this.modalService.addBoardModal();
    }
  }

  removeToken() {
    this.authService.removeToken()
  }

  isLogged():boolean {
    return this.authService.isLogged()
  }
}
