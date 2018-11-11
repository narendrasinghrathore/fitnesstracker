import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workout } from 'src/interfaces/Workout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from 'src/app/shared/services/workouts/workout.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  subscription: Subscription;
  workout: Workout;

  constructor(private router: Router, private activateRoute: ActivatedRoute,
    private workoutService: WorkoutService) { }

  async addWorkout(event: Workout) {
    await this.workoutService.addWorkout(event);
    this.backToWorkoutList();
  }

  backToWorkoutList() {
    this.router.navigate(['/health/workout']);
  }

  async updateWorkout(event: Workout) {
    const key = this.activateRoute.snapshot.params.id;
    await this.workoutService.updateWorkout(key, event);
    this.backToWorkoutList();
  }

  ngOnInit() {
    this.subscription = this.workoutService.workouts$.subscribe();
    this.workout$ = this.activateRoute.params.pipe(
      switchMap(param => {
        return this.workoutService.getWorkout(param['id']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
