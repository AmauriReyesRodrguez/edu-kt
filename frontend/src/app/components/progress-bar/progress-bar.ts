import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <div class="progress-fill" [style.width.%]="value" [style.background-color]="color"></div>
    </div>
  `,
  styles: [`
    .progress-container {
      width: 100%;
      height: 8px;
      background-color: var(--secondary-color);
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      transition: width 0.5s ease-in-out;
    }
  `]
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() color: string = 'var(--primary-color)';
}
