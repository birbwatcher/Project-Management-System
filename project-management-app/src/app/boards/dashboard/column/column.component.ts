import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Column, IBoard, IColumn, Task } from '../../kanban.service';
import { ITask } from '../../kanban.service';
import { KanbanService } from '../../kanban.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmWindowComponent } from 'src/app/core/modal/confirm-window/modal-window.component';
import { Store } from '@ngrx/store';
import { State } from '../../state/boards.state';
import { updateTasksAction } from '../../state/boards.actions';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})


export class ColumnComponent implements OnInit {
  i = 0;
  // tasks: ITask[] = [];

  columnLen: number = 0;

 @Input() column!: Column;

 constructor(
  public kanbanService:KanbanService,
  private modalService:ModalServiceService,
  private store: Store<State>,
  private http: HttpService
  ) {}
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

  this.modalService.addTaskModal(this.column._id, this.columnLen);
 }

 ngOnInit(): void {
   this.http.getTasksSet(this.column._id).subscribe(res => this.columnLen = res.length)
 }

 getColumnIndex() {
  // return this.kanbanService.getColumnIndex(this.column.id)
 }

 getColumnTasks(id: string){
  let newTaskOrder: Task[] = [];
  this.kanbanService.taskFilter(id).subscribe(res => newTaskOrder = JSON.parse(JSON.stringify(res))).unsubscribe()
  return newTaskOrder
  // return this.kanbanService.getColumnTasks(this.column.id);
 }

 removeColumn() {
  console.log(this.column._id, 'col', this.kanbanService.actualBoardId, 'board')
  // this.someService.removeColumn(this.column.id)


  this.modalService.remColModal(this.column._id, this.kanbanService.actualBoardId as string);
 }


    taskDrop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
      // console.log(event, tasks);
      console.log(event.previousContainer.data, 'event.previousContainer.data')
      console.log(event.container.data, 'event.container.data')

      // console.log(this.column._id, this.getColumnTasks(this.column._id))

      //
      let newTaskOrder: Task[] = [];
      let resultOrder: Task[] = [];
      this.kanbanService.taskFilter(this.column._id).subscribe(res => {
        newTaskOrder = JSON.parse(JSON.stringify(res))
      })

      this.store.select(res => res.boards.tasks).subscribe(res =>
        resultOrder = JSON.parse(JSON.stringify(res))
      )

      moveItemInArray(newTaskOrder, event.previousIndex, event.currentIndex)

      console.log(newTaskOrder, 'before')

      newTaskOrder.forEach((item, index) => item.order = index);

      console.log(newTaskOrder, 'after')

      newTaskOrder.forEach(item => {
        resultOrder.forEach(task => {
          if (item._id = task._id) {
            item.order = task.order;
          }
        })
      })

      this.store.dispatch(updateTasksAction({tasks: resultOrder.sort((a, b) => a.order > b.order ? 1 : -1)}))
      this.http.updateTasksSet(newTaskOrder);
      //

      // this.http.updateColumnSet(newTaskOrder).subscribe(res => {this.kanbanService.getBoardColumns(this.kanbanService.actualBoardId as string)});

      // if (event.previousContainer === event.container) {
      //       moveItemInArray(this.getColumnTasks(this.column._id), event.previousIndex, event.currentIndex )
      //     }
      //     else {
      //       transferArrayItem(
      //         event.previousContainer.data,
      //         event.container.data,
      //         event.previousIndex,
      //         event.currentIndex,
      //       );
      //     }
    }

//  taskDrop(event: CdkDragDrop<ITask[]>) {
//   if (event.previousContainer === event.container) {
//     // moveItemInArray(this.kanbanService.currentBoard.columns[this.getColumnIndex()].tasks, event.previousIndex, event.currentIndex )
//   }
//   else {
//     transferArrayItem(
//       event.previousContainer.data,
//       event.container.data,
//       event.previousIndex,
//       event.currentIndex,
//     );
//   }
//  }
}
