import { Component, Input, OnInit } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { Board } from 'src/app/models/app.models';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent {
  @Input() newBoard!: Board;

  constructor(public kanbanService: KanbanService, private modalService:ModalServiceService) {}

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
