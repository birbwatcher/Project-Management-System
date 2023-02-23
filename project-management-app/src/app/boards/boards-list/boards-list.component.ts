import { Component, Input } from '@angular/core';
import { IBoard } from '../kanban.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent {
  @Input() newBoard!: IBoard;

  constructor() {}

  getBoard() {
    // console.log(this.newBoard.id);
  }
}
