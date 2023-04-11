import { Injectable } from '@angular/core';
import { ConfirmWindowComponent } from '../core/modal/confirm-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { KanbanService } from 'src/app/services/kanban.service';
import { AddTaskModalComponent } from '../core/modal/add-task-modal/add-task-modal.component';
import { Store } from '@ngrx/store'
import { AddBoardModalComponent } from '../core/modal/add-board-modal/add-board-modal.component';
import { AddColumnModalComponent } from '../core/modal/add-column-modal/add-column-modal.component';
import { EditTaskModalComponent } from '../core/modal/edit-task-modal/edit-task-modal.component';
import { Task } from 'src/app/models/app.models';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorComponent } from '../core/modal/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  isModalOpen = false;

  constructor(private matDialog: MatDialog,
              private kanbanService: KanbanService
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
        this.kanbanService.addBoard(formRes.title, formRes.users).subscribe()
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

  remBoardModal(id: string) {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
      width:'300px', 
      height:'150px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.removeBoard(id)
      } else return;
    } )
  }

  addTaskModal(colId: string) {
    const dialogRef = this.matDialog.open(AddTaskModalComponent);

    let order = 0
    this.kanbanService.getColumnLen(colId).subscribe(res => order = res.length);
    this.kanbanService.getAllUsers();

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title) {
        this.kanbanService.addTask(formRes.title, formRes.taskDescription, colId, order, formRes.users)
      }
    } )
  }

  editTaskModal(task: Task) {
    const dialogRef = this.matDialog.open(EditTaskModalComponent, {
      data: task
    });
    this.kanbanService.getAllUsers();

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title) {
        this.kanbanService.editTask(formRes.title, formRes.taskDescription, task, formRes.users)
      }
    })
  }

  sessionExp() {
    let dialogData = {
      message: 'Your token is expired. Please sign-in'
    }
    const dialogRef = this.matDialog.open(ErrorComponent, {data: dialogData});
    dialogRef.afterClosed().subscribe()
  }

  showError(error: HttpErrorResponse) {
    if (!this.isModalOpen) {
      let dialogData = {
        message: error.error.message
      }
      this.isModalOpen = true;
      if (error.status === 401) {
        dialogData = {
          message: 'Login and Password did not match'
        }
      }
      const dialogRef = this.matDialog.open(ErrorComponent, {
        width:'300px', 
        height:'150px', 
        data: dialogData});
      
      return dialogRef.afterClosed().subscribe(res => this.isModalOpen = false)
    } else return;
  }
  
}
