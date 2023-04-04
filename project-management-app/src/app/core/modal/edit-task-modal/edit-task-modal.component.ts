import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KanbanService } from 'src/app/boards/kanban.service';
import { Task } from 'src/app/models/app.models';
import { ConfirmWindowComponent } from '../confirm-window/modal-window.component';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent {

  constructor(public dialogRef: MatDialogRef<EditTaskModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: Task,
              private kanbanService: KanbanService,
              private matDialog: MatDialog) {}

  
  form = new FormGroup({
    title: new FormControl<string>(this.data.title, [
      Validators.minLength(1),
      Validators.required,
    ]),
    taskDescription: new FormControl<string>(this.data.description)
  })

  deleteTask() {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
      width:'400px', 
      height:'200px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.deleteTask(this.data)
      } else return;
    } )
  }

  get title() {
    return this.form.controls.title as FormControl
  }

  get taskDescription() {
    return this.form.controls.taskDescription as FormControl
  }

  submit() {}

}
