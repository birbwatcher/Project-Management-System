import { ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board, KanbanService } from 'src/app/boards/kanban.service';
import { IBoard } from 'src/app/boards/kanban.service';
import { ModalServiceService } from '../../modal/modal-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/boards/state/boards.state';
import { Observable } from 'rxjs';

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
    // this.updateBoards()
    
  }

  updateBoards() {
    this.kanbanService.updateStore()
  }

  addBoard() {
    this.modalService.addBoardModal();
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
