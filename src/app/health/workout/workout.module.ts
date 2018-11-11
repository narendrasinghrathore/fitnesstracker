import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// module components
import { WorkoutComponent } from './container/workout/workout.component';
import { WorkoutsComponent } from './container/workouts/workouts.component';
import { WorkoutFormComponent } from './component/workout-form/workout-form.component';
import { WorkoutListComponent } from './component/workout-list/workout-list.component';
// material theme
import { MyOwnCustomMaterialModule } from 'src/app/theme/mat-theme.module';
import { WorkoutTypeComponent } from './component/workout-type/workout-type.component';

const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent }
];

@NgModule({
  declarations: [WorkoutComponent, WorkoutsComponent, WorkoutFormComponent, WorkoutListComponent, WorkoutTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WorkoutModule { }
