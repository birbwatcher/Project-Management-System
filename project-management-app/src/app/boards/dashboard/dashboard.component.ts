import { Component } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { IColumn, KanbanService } from '../kanban.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  i = 0;
  columns: ColumnComponent[] = [];

  constructor(public someService: KanbanService,
              public columnModal: ModalServiceService
    ) {};

  addColumn() {
    // this.someService.addColumn(
    //   {
    //     id: Math.random().toString(16),
    //     title: 'Column ' + this.i,
    //     order: this.i,
    //     tasks: [],
    //   }
    // )
    this.columnModal.addColModal();
    this.i++;
  }

  removeColumn(id: string) {
    this.someService.removeColumn(id);
  }

  checkColumn() {
    // console.log(this.columns);
  }

  columnDrop(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(this.someService.currentBoard.columns, event.previousIndex, event.currentIndex )
  }
}
