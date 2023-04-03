import { Injectable } from '@angular/core';
import { ConfirmWindowComponent } from './confirm-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { KanbanService } from 'src/app/boards/kanban.service';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { Store } from '@ngrx/store'
import { AddBoardModalComponent } from './add-board-modal/add-board-modal.component';
import { AddColumnModalComponent } from './add-column-modal/add-column-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { Task } from 'src/app/models/app.models';
import { InfoModalComponent } from './info-modal/info-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private matDialog: MatDialog,
              private kanbanService: KanbanService,
              private store: Store
    ) { }



  addBoardModal() {
    const dialogRef = this.matDialog.open(AddBoardModalComponent, {
      // width:'600px', 
      // height:'350px', 
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
    const dialogRef = this.matDialog.open(AddColumnModalComponent, {
      // width:'600px', 
      // height:'350px', 
    });

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title.length > 0) {
        this.kanbanService.addColumn(formRes.title)
      }
    } )
  }

  remColModal(colId: string, boardId: string) {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
      width:'300px', 
      height:'150px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.removeColumn(colId, boardId)
      } else return;
    } )
  }

  addTaskModal(colId: string) {
    const dialogRef = this.matDialog.open(AddTaskModalComponent);

    let order = 0
    this.kanbanService.getColumnLen(colId).subscribe(res => order = res.length)

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title) {
        this.kanbanService.addTask(formRes.title, formRes.taskDescription, colId, order)
      }
    } )
  }

  editTaskModal(task: Task) {
    const dialogRef = this.matDialog.open(EditTaskModalComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title) {
        this.kanbanService.editTask(formRes.title, formRes.taskDescription, task)
      }
    })
  }

  sessionExp() {
    const dialogRef = this.matDialog.open(InfoModalComponent);

    dialogRef.afterClosed().subscribe()
  }
}
