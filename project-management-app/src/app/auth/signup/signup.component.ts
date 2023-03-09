import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  passwordNotValid = false;
  userNameNotValid = false;
  nameNotValid = false;

  constructor() {}

  form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    name: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
  })

  onSubmit() {
    if (!this.form.controls.name.valid) {
      this.nameNotValid = true;
      return false;
    }
    if (!this.form.controls.username.valid) {
      this.userNameNotValid = true;
      return false;
    }
    if (!this.form.controls.password.valid) {
      this.passwordNotValid = true;
      return false;
    } else 
    this.passwordNotValid = false;
    this.userNameNotValid = false;
    this.nameNotValid = false;
    console.log(this.form.value);
    return true;
  }
}
