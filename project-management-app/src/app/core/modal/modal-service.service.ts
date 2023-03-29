import { Injectable } from '@angular/core';
import { ConfirmWindowComponent } from './confirm-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { KanbanService } from 'src/app/boards/kanban.service';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { Store } from '@ngrx/store'
import { updateBoardsAction } from 'src/app/boards/state/boards.actions';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private matDialog: MatDialog,
              private kanbanService: KanbanService,
              private store: Store
    ) { }



  addBoardModal() {
    const dialogRef = this.matDialog.open(AddTaskModalComponent, {
      width:'600px', 
      height:'350px', 
    });

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return;
      }
      if (formRes.title.length > 0) {
        this.kanbanService.addBoard(formRes.title).subscribe()
        this.kanbanService.updateStore()
      }
    } )
  }

  addColModal(){
    const dialogRef = this.matDialog.open(AddTaskModalComponent, {
      width:'600px', 
      height:'350px', 
    });

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title.length > 0) {
        this.kanbanService.addColumn(formRes.title)
        // this.kanbanService.updateStore()
      }
    } )
  }

  remColModal(colId: string, boardId: string) {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
      width:'400px', 
      height:'200px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.removeColumn(colId, boardId)
      } else return;
    } )
  }

  addTaskModal(colId: string, order: number) {
    const dialogRef = this.matDialog.open(AddTaskModalComponent);

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title) {
        this.kanbanService.addTask(formRes.title, colId, order)
      }
    } )
  }
}
