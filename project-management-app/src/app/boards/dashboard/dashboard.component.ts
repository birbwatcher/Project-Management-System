import { Component, Input, OnInit } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { Board, Column, IColumn, KanbanService } from '../kanban.service';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { HttpService } from '../http.service';
import { Store } from '@ngrx/store';
import { State } from '../state/boards.state';
import { updateColumnsAction } from '../state/boards.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // isLoading = false;

  // @Input() board!: any;

  // i = 0;
  columns: ColumnComponent[] = [];

  newOrder: Column[] = []

  constructor(public kanbanService: KanbanService,
              public columnModal: ModalServiceService,
              public http: HttpService,
              private store: Store<State>
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
    // this.i++;
  }

  removeColumn(id: string) {
    // this.kanbanService.removeColumn(id);
  }

  checkColumn() {
    // console.log(this.columns);
  }

  columnDrop(event: CdkDragDrop<Column[]>, board: Column[]) {
      // this.isLoading = true;
      let newColOrder: Column[] = [];
      
      this.kanbanService.myActualBoard$.subscribe(res => {
        newColOrder = JSON.parse(JSON.stringify(res))
      })
       
      moveItemInArray(newColOrder, event.previousIndex, event.currentIndex)
      
      newColOrder.forEach((item, index) => item.order = index);

      this.store.dispatch(updateColumnsAction({columns: newColOrder.sort((a, b) => a.order > b.order ? 1 : -1)}))

      this.http.updateColumnSet(newColOrder).subscribe(res => {this.kanbanService.getBoardColumns(this.kanbanService.actualBoardId as string)});
    

    }

}
