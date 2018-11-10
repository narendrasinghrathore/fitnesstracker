import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase, AngularFireList, DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { tap, map, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Meal } from 'src/interfaces/Meal';




@Injectable()
export class MealService {

  meals$: Observable<any[]> = this.db.list(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
      , tap((next) => this.store.set('meals', next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  get uid() {
    return this.auth.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  getMeal(key: string): Observable<Meal> {
    if (!key) { return of(); }
    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map((context) => context.find((meal: Meal) => meal.key === key))
    );
  }

  removeMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).remove(meal.key);
  }
}
