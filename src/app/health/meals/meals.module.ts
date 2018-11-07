import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers

import { MealComponent } from './container/meal/meal.component';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  { path: '', component: MealComponent }
];

@NgModule({
  declarations: [MealComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MealsModule { }
