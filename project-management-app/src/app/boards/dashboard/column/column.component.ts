import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBoard, IColumn } from '../../kanban.service';
import { ITask } from '../../kanban.service';
import { KanbanService } from '../../kanban.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})


export class ColumnComponent {
  i = 0;
  // tasks: ITask[] = [];

 @Input() column!: IColumn;

 constructor(public someService:KanbanService) {
}
 addCard() {
  this.someService.addTask({
    id: Math.random().toString(16),
    title: 'Task ' + this.i,
    order: this.i,
    description: 'string',
    userId: 'string',
  },this.column.id)
  this.i++
  // console.log(this.tasks)
 }

 getColumnIndex() {
  return this.someService.getColumnIndex(this.column.id)
 }

 removeColumn() {
  // console.log(this.column.id)
  this.someService.removeColumn(this.column.id)
 }
}
