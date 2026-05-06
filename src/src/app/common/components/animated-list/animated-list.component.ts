import {Component, input} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';
import {AnimateListItem} from '../../interface/animate-list-item';

@Component({
  selector: 'app-animated-list',
  imports: [
    MatTooltip
  ],
  templateUrl: './animated-list.component.html',
  styleUrl: './animated-list.component.scss',
  standalone: true,
})
export class AnimatedList {
  list = input<AnimateListItem[]>([]);
  listTitle = input('');
}
