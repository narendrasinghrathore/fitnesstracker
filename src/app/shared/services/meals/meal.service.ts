import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AngularFireDatabase, AngularFireList, DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { tap, } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Meal } from 'src/interfaces/Meal';




@Injectable()
export class MealService {

  meals$: Observable<Meal[] | AngularFireAction<DatabaseSnapshot<{}>>[]> =
  this.db.list(`meals/${this.uid}`).snapshotChanges().pipe(
    tap((next) => this.store.set('meals', next))
  );

constructor(
  private store: Store,
  private db: AngularFireDatabase,
  private auth: AuthService
) { }

get uid() {
  return this.auth.user.uid;
}
}
