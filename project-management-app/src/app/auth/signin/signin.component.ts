import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  passwordNotValid = false;
  userNameNotValid = false;

  form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
  })

  onSubmit() {
    if (!this.form.controls.username.valid) {
      this.userNameNotValid = true;
      return false;
    }
    if (!this.form.controls.password.valid) {
      this.passwordNotValid = true;
      return false;
    }
    else
    console.log(this.form.value);
    console.log(this.form.controls.username.valid)
    console.log(this.form.controls.password.valid)
    this.passwordNotValid = false;
    this.userNameNotValid = false;
    return
  }

}
