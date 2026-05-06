import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  @Output() viewChange = new EventEmitter<'landing' | 'admin' | 'audit' | 'login' | 'register' | 'recovery' | 'course' | 'profile' | 'about' | 'contact' | 'terms'>();

  exploreCourses() {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  }

  about() {
    this.viewChange.emit('about');
  }
}
