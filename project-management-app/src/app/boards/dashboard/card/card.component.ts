import { Component, Input } from '@angular/core';
import { ICard } from '../column/column.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() task!:ICard;

}
