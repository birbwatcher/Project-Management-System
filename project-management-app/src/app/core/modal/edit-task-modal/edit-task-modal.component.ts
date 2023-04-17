import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KanbanService } from 'src/app/services/kanban.service';
import { Task, UserResponse } from 'src/app/models/app.models';
import { ConfirmWindowComponent } from '../confirm-window/modal-window.component';
import { Observable, map, of, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {
  formControl = new FormControl();
  filteredUsers: Observable<UserResponse[]>;
  selectedUsers: UserResponse[] = [];

  constructor(public dialogRef: MatDialogRef<EditTaskModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: Task,
              public kanbanService: KanbanService,
              private matDialog: MatDialog,
              public auth: AuthService) 
              {
                this.filteredUsers = of();
              }

  ngOnInit() {
    this.filteredUsers = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value: string | UserResponse) => typeof value === 'string' ? value : value.name),
      map((name: string) => name ? this._filter(name) : this.kanbanService.allUsers.slice())
    );
  }

  form = new FormGroup({
    title: new FormControl<string>(this.data.title, [
      Validators.minLength(1),
      Validators.required,
    ]),
    taskDescription: new FormControl<string>(this.data.description),
    users: new FormControl<UserResponse[]>(this.selectedUsers = this.kanbanService.allUsers.filter(item => this.data.users.includes(item._id)))
  })

  deleteTask() {
    const dialogRef = this.matDialog.open(ConfirmWindowComponent, {
      width:'400px', 
      height:'200px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.deleteTask(this.data)
      } else return;
    } )
  }

  get title() {
    return this.form.controls.title as FormControl
  }

  get taskDescription() {
    return this.form.controls.taskDescription as FormControl
  }

  get users() {
    return this.form.controls.users as FormControl
  }

  submit() {}

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value as UserResponse;
    if (!this.selectedUsers.includes(user)) {
      this.selectedUsers.push(user);
    }
    this.formControl.setValue('');
  }

  removeUser(user: UserResponse): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  private _filter(name: string): UserResponse[] {
    const filterValue = name.toLowerCase();
    return this.kanbanService.allUsers.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
