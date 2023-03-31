import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-column-modal',
  templateUrl: './add-column-modal.component.html',
  styleUrls: ['./add-column-modal.component.scss']
})
export class AddColumnModalComponent {

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
