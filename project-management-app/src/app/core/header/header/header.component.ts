import { Component, OnInit } from '@angular/core';
import { KanbanService } from 'src/app/boards/kanban.service';
import { IBoard } from 'src/app/boards/kanban.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 logged = true;
 i = 1;

 boards: IBoard[] = [];

 constructor (public someService:KanbanService) {};

  addBoard() {
    this.someService.addBoard(
      {
        title: 'Board' + this.i,
        description: 'description',
        id: this.i,
        columns: []
      }
    )
    this.i++;
  }
 
  ngOnInit(): void {
    // this.addBoard()
  }

  getBoardId() {
    // this.someService.getBoardId()
  }
}
