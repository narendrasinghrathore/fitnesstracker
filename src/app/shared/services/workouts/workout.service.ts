import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { tap, map, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Workout } from 'src/interfaces/Workout';


import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';


@Injectable()
export class WorkoutService {

  workouts$: Observable<any[]> = this.db.list(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })
      ))
      , tap((next) => this.store.set('workouts', next)
      ));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer
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
    const workoutNull: Workout = {};
    if (!key) { return of(workoutNull); }
    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((context) => context.find((workout: Workout) => workout.key === key))
    );
  }

  removeWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).remove(workout.key);
  }

  registerSvgIcon(iconName: string) {
    return this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-icons/${iconName}.svg`));
  }
}
