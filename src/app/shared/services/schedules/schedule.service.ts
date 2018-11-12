import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from 'store';
import { tap, map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { DatabaseReference, DatabaseQuery } from '@angular/fire/database/interfaces';
import { ScheduleItem } from 'src/interfaces/ScheduleItem';
import { ScheduleList } from 'src/interfaces/ScheduleList';

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  private section$ = new Subject();

  selected$ = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next))
  );

  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
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

  selectSection(event: any) {
    this.section$.next(event);

  }

  get uid() {
    return this.authService.user.uid;
  }

  private getSchedule(startAt: number, endAt: number): any {
    return this.db.list(`schedule/${this.uid}`, (ref: DatabaseReference): any => {
      return {
        orderByChild: 'timestamp',
        startAt,
        endAt
      };
    });

  }
}
