import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './course-card.html',
  styleUrls: ['./course-card.css']
})
export class CourseCardComponent {
  @Input() course: any = {};
  @Input() enrolled = false;
  @Output() onEnter = new EventEmitter<string>();

  enterCourse() {
    this.onEnter.emit(this.course.id);
  }
}
