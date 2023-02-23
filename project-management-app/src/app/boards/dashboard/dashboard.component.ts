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
    // this.columns.push(new ColumnComponent())
    this.someService.addColumn(
      {
        id: Math.random().toString(16),
        title: 'string',
        order: this.i,
        tasks: [],
      }
    )
    this.i++;
  }

  removeColumn(id: string) {
    console.log()
    this.someService.removeColumn(id);
    // this.columns = this.columns.filter(item => item.id != id)
  }

  checkColumn() {
    // console.log(this.columns);
  }
}
