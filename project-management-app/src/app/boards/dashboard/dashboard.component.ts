import { Component } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  i = 0;
  columns: ColumnComponent[] = [];

  constructor(public someService: KanbanService) {};

  addColumn() {
    this.someService.addColumn(
      {
        id: Math.random().toString(16),
        title: 'Column ' + this.i,
        order: this.i,
        tasks: [],
      }
    )
    this.i++;
  }

  removeColumn(id: string) {
    this.someService.removeColumn(id);
  }

  checkColumn() {
    // console.log(this.columns);
  }
}
