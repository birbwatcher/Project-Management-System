import { Component, OnInit } from '@angular/core';
import { KanbanService } from 'src/app/boards/kanban.service';
import { IBoard } from 'src/app/boards/kanban.service';
import { ModalServiceService } from '../../modal/modal-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 logged = true;
 i = 1;

 boards: IBoard[] = [];

 constructor (public someService:KanbanService,
              public modalService:ModalServiceService
  ) {};

  addBoard() {
    this.modalService.addBoardModal()
    this.i++;
  }
 
  ngOnInit(): void {
    // this.addBoard()
  }

  getBoardId() {
    // this.someService.getBoardId()
  }
}
