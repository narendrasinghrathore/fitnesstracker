import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './component/workout/workout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutsComponent } from './container/workouts/workouts.component';
import { WorkoutFormComponent } from './component/workout-form/workout-form.component';

const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent }
];

@NgModule({
  declarations: [WorkoutComponent, WorkoutsComponent, WorkoutFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WorkoutModule { }
