import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/boards/http.service';
import { KanbanService } from 'src/app/boards/kanban.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  constructor(private http:HttpService, private router: Router, public kanbanService:KanbanService) {}

  form = new FormGroup({
    search: new FormControl<string>('', [
      Validators.minLength(1),
      Validators.required,
    ])
  })

  doSearch() {
    console.log('lets search!')
  }

  onSubmit() {
    console.log(this.form.value, 'this form value')
    this.kanbanService.searchResults$ = this.http.getSearchResults(this.form.controls.search.value as string);
    this.router.navigate(['/search'])
    this.form.controls.search.patchValue('');
  }

}
