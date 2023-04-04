import { Component, Input, OnInit } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { Board } from 'src/app/models/app.models';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent {
  @Input() newBoard!: Board;

  constructor(public kanbanService: KanbanService) {}

  getBoardId() {
    this.kanbanService.getBoardColumns(this.newBoard._id);
    this.kanbanService.actualBoardId = this.newBoard._id;
    this.kanbanService.myActualBoard$.subscribe().unsubscribe()
    this.kanbanService.getBoardLen()
    this.kanbanService.getTasksSet();
  }
}
