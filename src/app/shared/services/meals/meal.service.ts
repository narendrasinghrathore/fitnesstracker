import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase, AngularFireList, DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Meal } from 'src/interfaces/Meal';




@Injectable()
export class MealService {

  meals$: Observable<any[]> = this.db.list(`meals/${this.uid}`)
    .valueChanges()
    .pipe(tap((next) => this.store.set('meals', next)));

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
}
