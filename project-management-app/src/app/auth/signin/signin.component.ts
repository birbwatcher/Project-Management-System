import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private kanbanService: KanbanService) {}

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
    this.authService.login(this.form.value.username as string, this.form.value.password as string).subscribe(res => {this.kanbanService.getAllUsers()})
    this.passwordNotValid = false;
    this.userNameNotValid = false;
    return false;
  }

}
