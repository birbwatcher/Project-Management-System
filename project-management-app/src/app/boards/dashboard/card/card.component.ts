import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/app.models';
import { KanbanService } from '../../kanban.service';
import { ModalServiceService } from 'src/app/core/modal/modal-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!:Task;

  constructor(private modalService:ModalServiceService) {}

  editTask() {
    this.modalService.editTaskModal(this.task)
  }

}
