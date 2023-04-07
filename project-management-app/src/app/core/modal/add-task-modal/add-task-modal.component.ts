import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, of, startWith } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { KanbanService } from 'src/app/services/kanban.service';
import { UserResponse } from 'src/app/models/app.models';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {
  formControl = new FormControl();
  filteredUsers: Observable<UserResponse[]>;
  selectedUsers: UserResponse[] = [];

  constructor(private http: HttpService, private kanbanService: KanbanService) {
    this.filteredUsers = of([]);
  }

  ngOnInit() {
    this.filteredUsers = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value: string | UserResponse) => typeof value === 'string' ? value : value.name),
      map((name: string) => name ? this._filter(name) : this.kanbanService.allUsers.slice())
    );
  }

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    taskDescription: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    users: new FormControl<UserResponse[]>(this.selectedUsers, [
      Validators.required,
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  get taskDescription() {
    return this.form.controls.taskDescription as FormControl
  }

  // get users() {
  //   return this.form.controls.users as FormControl;
  // }

  submit() {}

  private _filter(name: string): UserResponse[] {
    const filterValue = name.toLowerCase();
    return this.kanbanService.allUsers.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }

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

}
