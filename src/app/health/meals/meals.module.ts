import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers

import { MealComponent } from './container/meals/meal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyOwnCustomMaterialModule } from 'src/app/theme/mat-theme.module';
import { NewComponent } from './container/new/new.component';

const ROUTES: Routes = [
  { path: '', component: MealComponent },
  { path: 'new', component: NewComponent }
];

@NgModule({
  declarations: [MealComponent, NewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MealsModule { }
