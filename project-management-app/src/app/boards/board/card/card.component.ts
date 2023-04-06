import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/app.models';
import { KanbanService } from '../../kanban.service';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!:Task;

  constructor(private modalService:ModalServiceService, private auth:AuthService) {}

  editTask() {
    if (this.auth.isLogged()) {
      this.modalService.editTaskModal(this.task)
    }
  }

}
