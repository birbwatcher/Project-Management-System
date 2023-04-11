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
 i = 1;

//  myBoards$: Observable<Board[]>;
//  boards: Board[] = [];

 constructor (public kanbanService:KanbanService,
              public modalService:ModalServiceService,
              public authService: AuthService,
              // private store: Store<State>
  ) {};

  ngOnInit(): void {
    // this.kanbanService.removeAllBoards();
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
