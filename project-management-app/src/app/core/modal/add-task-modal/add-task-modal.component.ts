import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KanbanService } from 'src/app/boards/kanban.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {

  constructor(private kanbanService: KanbanService) {}

  form = new FormGroup({
    title: new FormControl<string>('')
  })

  submit() {
    console.log(this.form.value)
  }

}
