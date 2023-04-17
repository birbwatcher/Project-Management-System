import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  constructor(public kanbanService: KanbanService, private router:Router) {}

  goToBoard(id: string) {
    this.kanbanService.getBoardColumns(id);
    this.kanbanService.actualBoardId = id;
    this.kanbanService.myActualBoard$.subscribe().unsubscribe()
    this.kanbanService.getBoardLen()
    this.kanbanService.getTasksSet();
    this.router.navigate(['/board'])
  }

}
