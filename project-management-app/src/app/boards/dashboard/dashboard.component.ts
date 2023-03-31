import { Component, Input, OnInit } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { KanbanService } from '../kanban.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { HttpService } from '../http.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app.models';
import { updateColumnsAction } from '../state/boards.actions';
import { Column } from 'src/app/models/app.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // isLoading = false;

  columns: ColumnComponent[] = [];
  newOrder: Column[] = []
  constructor(public kanbanService: KanbanService,
              public columnModal: ModalServiceService,
              public http: HttpService,
              private store: Store<State>
    ) {};

  addColumn() {
    this.columnModal.addColModal();
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
