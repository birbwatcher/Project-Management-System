import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { KanbanService } from '../../kanban.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app.models';
import { updateTasksAction } from '../../state/boards.actions';
import { HttpService } from '../../http.service';
import { Column, Task } from 'src/app/models/app.models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})


export class ColumnComponent implements OnInit {
  columnLen: number = 0;

 @Input() column!: Column;

 constructor(
  public kanbanService:KanbanService,
  private modalService:ModalServiceService,
  private store: Store<State>,
  private http: HttpService
  ) {}

 addCard() {
  this.modalService.addTaskModal(this.column._id);
 }

 ngOnInit(): void {
   this.http.getTasksSet(this.column._id).subscribe(res => this.columnLen = res.length)
 }

 getColumnTasks(id: string){
  let newTaskOrder: Task[] = [];
  this.kanbanService.taskFilter(id).subscribe(res => newTaskOrder = JSON.parse(JSON.stringify(res))).unsubscribe()
  return newTaskOrder
 }

 removeColumn() {
  this.modalService.remColModal(this.column._id, this.kanbanService.actualBoardId as string);
 }


taskDrop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
  let newTaskOrder: Task[] = [];
  let resultOrder: Task[] = [];

  this.store.select(res => res.boards.tasks).subscribe(res =>
    resultOrder = JSON.parse(JSON.stringify(res))
  )

  if (event.previousContainer === event.container) {
    this.kanbanService.taskFilter(this.column._id).subscribe(res => {
      newTaskOrder = JSON.parse(JSON.stringify(res))
    })

    moveItemInArray(newTaskOrder, event.previousIndex, event.currentIndex)

    newTaskOrder.forEach((item, index) => item.order = index);

    resultOrder.forEach(item => {
      const updateItem = newTaskOrder.find(update => update._id === item._id);
      if (updateItem) {
        item.order = updateItem.order;
      }
    });

  } else {
    let prevCol: Task[] = [];
    let curCol: Task[] = [];

    transferArrayItem
    (
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    prevCol = event.previousContainer.data;
    curCol = event.container.data

    curCol.forEach((item, index) => {item.columnId = this.column._id; item.order = index})
    prevCol.forEach((item, index) => item.order = index)

    let preResultOrder = [...prevCol, ...curCol]

    resultOrder.forEach(item => {
      const updateItem = preResultOrder.find(update => update._id === item._id);
      if (updateItem) {
        item.order = updateItem.order;
        item.columnId = updateItem.columnId;
      }
    });
  }
  resultOrder.sort((a, b) => a.order > b.order ? 1 : -1)
  this.store.dispatch(updateTasksAction({tasks: resultOrder}))
  this.http.updateTasksSet(resultOrder).subscribe()
}


}
