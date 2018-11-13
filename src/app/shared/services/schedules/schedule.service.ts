import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Store } from 'store';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { ScheduleList } from 'src/interfaces/ScheduleList';
import { ScheduleItem } from 'src/interfaces/ScheduleItem';

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  private section$ = new Subject();

  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      console.log(section)
      const id = section.data.key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }


    })
  );

  selected$ = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next))
  );

  list$ = this.section$.pipe(
    map((val) => this.store.value[val['type']]),
    tap((next: any) => this.store.set('list', next))
  );

  schedule$: Observable<any> = this.date$.pipe(
    tap((next) => this.store.set('date', next)),
    map((day: Date) => {

      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return { startAt, endAt };

    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {

      const mapped: ScheduleList = {};
      for (const prop of data) {
        if (!mapped[prop]['section']) {
          mapped[prop]['section'] = prop;
        }
      }

      return mapped;

    }),
    tap((next: any) => this.store.set('schedule', next))
  );

  constructor(private store: Store, private db: AngularFireDatabase,
    private authService: AuthService) { }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  updateItem(data: string[]) {
    this.itemList$.next(data);
  }



  selectSection(event: any) {
    this.section$.next(event);
  }

  get uid() {
    return this.authService.user.uid;
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem) {
    console.log(payload);
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private getSchedule(startAt: number, endAt: number): any {
    return this.db.list(`schedule/${this.uid}`, ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)).snapshotChanges();
  }
}
