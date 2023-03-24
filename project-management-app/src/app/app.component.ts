import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { KanbanService } from './boards/kanban.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService,
              private kanbanService: KanbanService) {}

  ngOnInit(): void {
    this.authService.authorize()
    this.kanbanService.updateStore()
    // this.kanbanService.superPuper()
  }
}
