import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column, IBoard, IColumn } from '../../kanban.service';
import { ITask } from '../../kanban.service';
import { KanbanService } from '../../kanban.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmWindowComponent } from 'src/app/core/modal/confirm-window/modal-window.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})


export class ColumnComponent {
  i = 0;
  tasks: ITask[] = [];

 @Input() column!: Column;

 constructor(
  public kanbanService:KanbanService,
  private modalService:ModalServiceService
  ) {
}
 addCard() {
  // this.someService.addTask({
  //   id: Math.random().toString(16),
  //   title: 'Task ' + this.i,
  //   order: this.i,
  //   description: 'string',
  //   userId: 'string',
  // },this.column.id)
  this.i++
  // console.log(this.tasks)

  // this.modalService.addTaskModal(this.column.id);
 }

 getColumnIndex() {
  // return this.kanbanService.getColumnIndex(this.column.id)
 }

 getColumnTasks(){
  // return this.kanbanService.getColumnTasks(this.column.id);
 }

 removeColumn() {
  console.log(this.column._id, 'col', this.kanbanService.actualBoardId, 'board')
  // this.someService.removeColumn(this.column.id)


  this.modalService.remColModal(this.column._id, this.kanbanService.actualBoardId as string);
 }

 taskDrop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    // moveItemInArray(this.kanbanService.currentBoard.columns[this.getColumnIndex()].tasks, event.previousIndex, event.currentIndex )
  } 
  else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
 }
}
