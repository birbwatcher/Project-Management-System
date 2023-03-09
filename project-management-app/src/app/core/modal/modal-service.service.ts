import { Injectable } from '@angular/core';
import { ConfirmWindowComponent } from './confirm-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { KanbanService } from 'src/app/boards/kanban.service';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private matDialog: MatDialog,
              private kanbanService: KanbanService
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
        this.kanbanService.addBoard(
          {
            title: formRes.title,
            description: 'description',
            id: 4,
            columns: []
          }
        ) 
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
        this.kanbanService.addColumn(
          {
            id: Math.random().toString(16),
            title: formRes.title,
            order: 3,
            tasks: [],
          }
        ) 
      }
    } )
  }

  remColModal(id: string) {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
      width:'400px', 
      height:'200px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.removeColumn(id)
      } else return;
    } )
  }

  addTaskModal(id: string) {
    const dialogRef = this.matDialog.open(AddTaskModalComponent);

    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return
      }
      if (formRes.title) {
        this.kanbanService.addTask(
          {
            id: Math.random().toString(16),
            title: formRes.title,
            order: 1,
            description: 'string',
            userId: 'string',
          }, id) 
      }
    } )
  }

}
