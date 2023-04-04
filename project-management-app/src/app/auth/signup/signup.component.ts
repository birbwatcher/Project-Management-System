import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  passwordNotValid = false;
  userNameNotValid = false;
  nameNotValid = false;

  constructor( private authService: AuthService,
               private router: Router) {}

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

    this.authService.signup(this.form.value.name as string, this.form.value.username as string, this.form.value.password as string).subscribe({
      next: (value) => {
        this.router.navigate(['/sign-in'])
      },
      error(err) {

      }
    })

    this.passwordNotValid = false;
    this.userNameNotValid = false;
    this.nameNotValid = false;
    return true;
  }
}
