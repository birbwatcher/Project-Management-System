import { Component, Input, OnInit } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';
import { Board, UserResponse } from 'src/app/models/app.models';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { HttpService } from '../../services/http.service';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  @Input() board!: Board;
  boardOwner$: Observable<UserResponse>
  boardUsers$: Observable<UserResponse[]>

  constructor(public kanbanService: KanbanService,
              private modalService:ModalServiceService, 
              public http:HttpService,
              public auth:AuthService) {}

  ngOnInit(): void {
    this.boardOwner$ = this.http.getUserName(this.board.owner);
    this.boardUsers$ = this.http.getAllUsers();
  }

  getBoardId() {
    this.kanbanService.getBoardColumns(this.board._id);
    this.kanbanService.actualBoardId = this.board._id;
    this.kanbanService.myActualBoard$.subscribe().unsubscribe()
    this.kanbanService.getBoardLen()
    this.kanbanService.getTasksSet();
  }

  removeBoard(){
    this.modalService.remBoardModal(this.board._id)
  }

  getUserName(id: string): Observable<string> {
    return this.http.getUserName(id).pipe(map(item => item.name));
  }
}
