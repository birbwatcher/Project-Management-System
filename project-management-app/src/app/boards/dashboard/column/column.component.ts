import { Component, Input } from '@angular/core';
import { IColumn } from '../dashboard.component';

export interface ICard {
  title: string;
  id?: number;
}

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})


export class ColumnComponent {
  tasks: ICard[] = [];

 @Input()
  column!: IColumn;

 constructor() {}
 
 addCard() {
  this.tasks.push({title: 'Card'})
  console.log(this.tasks)
 }
}
