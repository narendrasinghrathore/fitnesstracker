import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Workout } from 'src/interfaces/Workout';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {

  @Input()
  workouts: Workout[];

  @Output()
  remove: EventEmitter<Workout> = new EventEmitter<Workout>();

  constructor() { }

  ngOnInit() {
  }

  getRoute(item: Workout) {
    return ['./', item.key];
  }

  removeItem(item: Workout) {
    this.remove.emit(item);
  }


}
