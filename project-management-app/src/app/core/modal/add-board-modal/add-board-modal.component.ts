import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, of, startWith } from 'rxjs';
import { KanbanService } from 'src/app/boards/kanban.service';
import { UserResponse } from 'src/app/models/app.models';

@Component({
  selector: 'app-add-board-modal',
  templateUrl: './add-board-modal.component.html',
  styleUrls: ['./add-board-modal.component.scss']
})
export class AddBoardModalComponent implements OnInit {
  formControl = new FormControl();
  filteredUsers: Observable<UserResponse[]>;
  selectedUsers: UserResponse[] = [];

  constructor(private kanbanService: KanbanService) {
    this.filteredUsers = of([]);
  };

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ]),
    users: new FormControl<UserResponse[]>(this.selectedUsers, [
      Validators.required,
    ])
  })

  ngOnInit() {
    this.filteredUsers = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value: string | UserResponse) => typeof value === 'string' ? value : value.name),
      map((name: string) => name ? this._filter(name) : this.kanbanService.allUsers.slice())
    );
  }

  get title() {
    return this.form.controls.title as FormControl
  }

  submit() {
    
  }

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
