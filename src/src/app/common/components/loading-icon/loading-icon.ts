import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-loading-icon',
  imports: [],
  templateUrl: './loading-icon.html',
  styleUrl: './loading-icon.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class LoadingIcon {
  @Input() width = '100%';
  @Input() height = '100%';
  @Input() fontSize = '14px';
  @Input() fontWeight = 'normal';
  @Input() fill: string | null = '#CCC8AFFF';
}
