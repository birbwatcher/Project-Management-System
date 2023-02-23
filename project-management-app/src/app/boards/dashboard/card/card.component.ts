import { Component, Input } from '@angular/core';
import { ITask } from '../../kanban.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!:ITask;

  constructor() {}

  getCardId() {
    console.log('Task id: ' + this.task)
  }

}
