import { Injectable } from '@angular/core';
import { ModalWindowComponent } from './modal-window/modal-window.component';
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

  getModal(id: string) {
    const dialogRef = this.matDialog.open(ModalWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.removeColumn(id)
      } else return;
    } )
  }

  addTaskModal(id: string) {
    const dialogRef = this.matDialog.open(AddTaskModalComponent, {id});
    
    dialogRef.afterClosed().subscribe(formRes => {
      this.kanbanService.addTask(
          {
            id: Math.random().toString(16),
            title: formRes.title,
            order: 1,
            description: 'string',
            userId: 'string',
          }, id)
    } )
  }

}
