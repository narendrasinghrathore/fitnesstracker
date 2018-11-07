import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './container/workout/workout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: WorkoutComponent }
];

@NgModule({
  declarations: [WorkoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WorkoutModule { }
