import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from 'store';
import { ScheduleService } from 'src/app/shared/services/schedules/schedule.service';
import { ScheduleItem } from 'src/interfaces/ScheduleItem';
import { Meal } from 'src/interfaces/Meal';
import { Workout } from 'src/interfaces/Workout';
import { MealService } from 'src/app/shared/services/meals/meal.service';
import { WorkoutService } from 'src/app/shared/services/workouts/workout.service';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  schedule$: Observable<ScheduleItem[]>;

  selected$: Observable<any>;

  list$: Observable<Meal[] | Workout[]>;


  constructor(private store: Store, private scheduleService: ScheduleService,
    private mealService: MealService, private workoutService: WorkoutService) { }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.scheduleService.selectSection(event);
    this.open = true;
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  assignItem(items: string[]) {
    this.scheduleService.updateItem(items);
    this.closeAssign();

  }

  closeAssign() {
    this.open = false;
  }

}
