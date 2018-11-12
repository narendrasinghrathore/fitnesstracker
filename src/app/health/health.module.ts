import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { HealthComponent } from './health/health.component';
import { MyOwnCustomMaterialModule } from '../theme/mat-theme.module';
import { CommonModule } from '@angular/common';



const ROUTES: Routes = [
  {
    path: '', component: HealthComponent, children: [
      { path: 'meals', canActivate: [AuthGuardService], loadChildren: './meals/meals.module#MealsModule' },
      { path: 'schedule', canActivate: [AuthGuardService], loadChildren: './schedule/schedule.module#ScheduleModule' },
      { path: 'workout', canActivate: [AuthGuardService], loadChildren: './workout/workout.module#WorkoutModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MyOwnCustomMaterialModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [HealthComponent]
})
export class HealthModule { }
