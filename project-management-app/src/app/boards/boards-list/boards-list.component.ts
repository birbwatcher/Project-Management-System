import { Component, Input, OnInit } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';
import { Board, User, UserResponse } from 'src/app/models/app.models';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { HttpService } from '../../services/http.service';
import { Observable, combineLatest, filter, forkJoin, map, merge, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  @Input() newBoard!: Board;
  boardOwner$: Observable<UserResponse>
  boardUsers$: Observable<UserResponse[]>

  constructor(public kanbanService: KanbanService,
              private modalService:ModalServiceService, 
              public http:HttpService,
              public auth:AuthService) {}

  ngOnInit(): void {
    this.boardOwner$ = this.http.getUserName(this.newBoard.owner);
    this.boardUsers$ = this.http.getAllUsers();
  }

  getBoardId() {
    this.kanbanService.getBoardColumns(this.newBoard._id);
    this.kanbanService.actualBoardId = this.newBoard._id;
    this.kanbanService.myActualBoard$.subscribe().unsubscribe()
    this.kanbanService.getBoardLen()
    this.kanbanService.getTasksSet();
  }

  removeBoard(){
    this.modalService.remBoardModal(this.newBoard._id)
  }

  getUserName(id: string): Observable<string> {
    return this.http.getUserName(id).pipe(map(item => item.name));
  }
}
