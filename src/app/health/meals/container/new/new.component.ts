import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from 'src/app/shared/services/meals/meal.service';

import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/interfaces/Meal';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscription: Subscription;
  meal: Meal;

  constructor(private router: Router, private activateRoute: ActivatedRoute,
    private mealService: MealService) { }

  async addMeal(event: Meal) {
    await this.mealService.addMeal(event);
    this.backToMealList();
  }

  backToMealList() {
    this.router.navigate(['/health/meals']);
  }

  async updateMeal(event: Meal) {
    const key = this.activateRoute.snapshot.params.id;
    await this.mealService.updateMeal(key, event);
    this.backToMealList();
  }

  ngOnInit() {
    this.subscription = this.mealService.meals$.subscribe();
    this.meal$ = this.activateRoute.params.pipe(
      switchMap(param => {
        return this.mealService.getMeal(param['id']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
