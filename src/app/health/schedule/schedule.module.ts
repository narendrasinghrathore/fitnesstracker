import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './container/schedule/schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ScheduleModule { }
