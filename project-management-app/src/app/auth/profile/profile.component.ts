import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/core/modal/confirm-window/modal-window.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  nameNotValid = false;
  oldPassNotValid = false;
  newPassNotValid = false;

  userUsername: string = '';

  constructor(private matDialog: MatDialog,
              private authservice: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.getUserName()
    this.authservice.getUserId()
  }


  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    newPassword: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    oldPassword: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
  })

  onUpdate() {
    if (!this.form.controls.name.valid) {
      this.nameNotValid = true;
      return false;
    }
    if (!this.form.controls.oldPassword.valid) {
      this.oldPassNotValid = true;
      return false;
    }
    if (!this.form.controls.newPassword.valid) {
      this.newPassNotValid = true;
      return false;
    } else
    this.oldPassNotValid = false;
    this.newPassNotValid = false;
    this.nameNotValid = false;

    this.form.disable()
    this.authservice.login(this.authservice.username as string, this.form.value.oldPassword as string).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.authservice.updateUser({
        name: this.form.value.name as string,
        login: this.authservice.username as string,
        password: this.form.value.newPassword as string
       }
      )
      this.form.enable();
    })

    return true;
  }

  removeUser(id: string) {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
        width:'400px',
        height:'200px',
    });


    dialogRef.afterClosed().subscribe(formRes => {
      if (!formRes) {
        return;
      }
        this.authservice.removeUser();
        this.router.navigate(['/sign-in']);
      })
    }

    getUserName() {
      this.authservice.getUserName().subscribe(resolve => {
      resolve.forEach(item => {
        if (item.login === this.authservice.getCurrentUser()) {
          this.userUsername = item.name;
          return this.form.patchValue({name: item.name});
        }
      })
    })
    }
  }
