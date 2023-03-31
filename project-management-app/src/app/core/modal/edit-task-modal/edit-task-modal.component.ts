import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/app.models';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent {

  constructor(public dialogRef: MatDialogRef<EditTaskModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: Task) {}

  form = new FormGroup({
    title: new FormControl<string>(this.data.title, [
      Validators.minLength(1),
      Validators.required,
    ]),
    taskDescription: new FormControl<string>(this.data.description)
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  get taskDescription() {
    return this.form.controls.taskDescription as FormControl
  }

  submit() {
    // console.log(this.form.value)
  }

}
