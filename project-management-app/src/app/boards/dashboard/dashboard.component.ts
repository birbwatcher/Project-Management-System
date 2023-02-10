import { Component } from '@angular/core';

export interface IColumn {
  title: string;
  id?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  i = 1;

  columns: IColumn[] = [
  ];

  addColumn() {
    this.columns.push({title: 'Todo3', id: this.i++})
  }

  removeColumn(id: number) {
    this.columns = this.columns.filter(item => item.id != id)
  }
}
