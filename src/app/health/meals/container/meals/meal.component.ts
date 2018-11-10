import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from 'src/app/shared/services/meals/meal.service';
import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/interfaces/Meal';
import { Store } from 'store';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  constructor(private mealService: MealService, private store: Store) { }

  meals$: Observable<Meal[]>;
  subscription: Subscription;
  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealService.meals$.subscribe();
  }

  removeItem(item: Meal) {
    const answer = window.confirm(`Do you want to remove the item: ${item.name}`);
    if (answer) {
      this.mealService.removeMeal(item);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
