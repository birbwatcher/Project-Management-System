import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IColumn } from '../dashboard.component';
import { DashboardComponent } from '../dashboard.component';

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

 @Input() column!: IColumn;
 @Output() onRemove = new EventEmitter<number>()

 constructor() {}
 
 addCard() {
  this.tasks.push({title: 'Card'})
 }

 removeColumn() {
  this.onRemove.emit(this.column.id)
 }
}
