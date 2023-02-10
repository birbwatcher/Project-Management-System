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

  columns: IColumn[] = [
  ];

  addColumn() {
    this.columns.push({title: 'Todo3'})
  }

  removeColumn(event:Event) {
    console.log(event.target)
  }
}
