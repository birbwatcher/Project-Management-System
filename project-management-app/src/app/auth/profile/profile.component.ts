import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/core/modal/confirm-window/modal-window.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  nameNotValid = false;
  oldPassNotValid = false;
  newPassNotValid = false;

  constructor(private matDialog: MatDialog) {}

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    newPassword: new FormControl<string>('', [
      Validators.minLength(1)
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
    console.log(this.form.valid);
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
        console.log('user removed');})
    }
  }
