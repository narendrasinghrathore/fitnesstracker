import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';
import { Workout } from 'src/interfaces/Workout';
import { WorkoutService } from 'src/app/shared/services/workouts/workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  constructor(private workoutService: WorkoutService, private store: Store) { }

  workouts$: Observable<Workout[]>;
  subscription: Subscription;
  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutService.workouts$.subscribe();
     // registering svg icons
     this.workoutService.registerSvgIcon('bench-press');
     this.workoutService.registerSvgIcon('strength');
     this.workoutService.registerSvgIcon('endurance');

  }
  removeItem(item: Workout) {
    const answer = window.confirm(`Do you want to remove the item: ${item.name}`);
    if (answer) {
      this.workoutService.removeWorkout(item);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
