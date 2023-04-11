import { Component, Input, OnInit } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { KanbanService } from '../../services/kanban.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { HttpService } from '../../services/http.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app.models';
import { updateColumnsAction } from '../state/boards.actions';
import { Column } from 'src/app/models/app.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // isLoading = false;

  columns: ColumnComponent[] = [];
  newOrder: Column[] = []
  constructor(public kanbanService: KanbanService,
              public modal: ModalServiceService,
              public http: HttpService,
              private store: Store<State>,
              private auth: AuthService,
              private router: Router,
    ) {};

  ngOnInit(): void {
      this.auth.getUserId();
      if (this.kanbanService.actualBoardId === null) {
        this.router.navigate(['/dashboard'])
      }
  }

  addColumn() {
    this.modal.addColModal();
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

    isLogged(): boolean {
      if (!this.auth.isLogged()) {
        this.router.navigate(['/sign-in']);
        return false;
      } return true;
      
    }

}
