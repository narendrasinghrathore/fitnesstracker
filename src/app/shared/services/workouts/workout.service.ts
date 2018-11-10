import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { tap, map, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Workout } from 'src/interfaces/Workout';




@Injectable()
export class WorkoutService {

  workouts$: Observable<any[]> = this.db.list(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
      , tap((next) => this.store.set('workouts', next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  get uid() {
    return this.auth.user.uid;
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  getWorkout(key: string): Observable<Workout> {
    if (!key) { return of(); }
    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((context) => context.find((workout: Workout) => workout.key === key))
    );
  }

  removeWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).remove(workout.key);
  }
}
