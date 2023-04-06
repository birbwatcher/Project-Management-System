import { Component, OnInit } from '@angular/core';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor (public kanbanService:KanbanService){}

  ngOnInit(): void {
    this.kanbanService.getAllUsers();
  }

}
