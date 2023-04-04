import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpService } from 'src/app/boards/http.service';
import { KanbanService } from 'src/app/boards/kanban.service';
import { UserResponse } from 'src/app/models/app.models';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  formControl = new FormControl();
  filteredUsers: Observable<UserResponse[]>;
  selectedUsers: UserResponse[] = [];
  
  // allUsers: UserResponse[] = [
  //   {
  //     "_id": "641853c387a6ecd1401b14c6",
  //     "name": "Not admin",
  //     "login": "notadmin"
  //   },
  //   // {
  //   //   "_id": "641b1c0f87a6ecd1401b1b3f",
  //   //   "name": "Johny Walker",
  //   //   "login": "admin"
  //   // }
  // ];


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
    console.log(this.selectedUsers)
  }
  
  removeUser(user: UserResponse): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }
}


