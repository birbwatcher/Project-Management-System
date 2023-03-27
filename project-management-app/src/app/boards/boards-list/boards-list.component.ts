import { Component, Input, OnInit } from '@angular/core';
import { Board, IBoard } from '../kanban.service';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent {
  @Input() newBoard!: Board;

  constructor(public kanbanService: KanbanService) {}

  getBoardId() {
    this.kanbanService.getBoard(this.newBoard._id);
    this.kanbanService.getBoardColumns(this.newBoard._id);
    this.kanbanService.actualBoardId = this.newBoard._id
  }
}
