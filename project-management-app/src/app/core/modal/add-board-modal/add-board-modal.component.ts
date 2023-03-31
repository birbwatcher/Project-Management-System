import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-board-modal',
  templateUrl: './add-board-modal.component.html',
  styleUrls: ['./add-board-modal.component.scss']
})
export class AddBoardModalComponent {

  constructor() {};

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
    
  }

}
