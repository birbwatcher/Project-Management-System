import { Component } from '@angular/core';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor (public kanbanService:KanbanService){}

}
