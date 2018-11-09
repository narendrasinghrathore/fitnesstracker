import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/interfaces/Meal';
import { MealService } from 'src/app/shared/services/meals/meal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  constructor(private mealService: MealService,
    private router: Router) { }

  async addMeal(event: Meal) {
    await this.mealService.addMeal(event);
    this.backToMealList();
  }

  backToMealList() {
    this.router.navigate(['/health/meals']);
  }

}
