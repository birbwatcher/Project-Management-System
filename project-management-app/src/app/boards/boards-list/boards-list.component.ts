import { Component, Input, OnInit } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { Board, User, UserResponse } from 'src/app/models/app.models';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { HttpService } from '../http.service';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  @Input() newBoard!: Board;
  boardOwner$: Observable<UserResponse>

  constructor(public kanbanService: KanbanService,
              private modalService:ModalServiceService, 
              public http:HttpService,
              public auth:AuthService) {}

  ngOnInit(): void {
    this.boardOwner$ = this.http.getUserName(this.newBoard.owner)
  }

  getBoardId() {
    this.kanbanService.getBoardColumns(this.newBoard._id);
    this.kanbanService.actualBoardId = this.newBoard._id;
    this.kanbanService.myActualBoard$.subscribe().unsubscribe()
    this.kanbanService.getBoardLen()
    this.kanbanService.getTasksSet();
  }

  removeBoard(){
    console.log(this.newBoard._id)
    this.modalService.remBoardModal(this.newBoard._id)
  }
}
