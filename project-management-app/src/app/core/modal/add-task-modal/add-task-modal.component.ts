import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KanbanService } from 'src/app/boards/kanban.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {

  constructor() {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  submit() {
    // console.log(this.form.value)
  }

}
