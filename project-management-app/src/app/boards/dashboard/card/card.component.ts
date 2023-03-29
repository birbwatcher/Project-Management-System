import { Component, Input } from '@angular/core';
import { ITask, Task } from '../../kanban.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!:Task;

  constructor() {}

}
