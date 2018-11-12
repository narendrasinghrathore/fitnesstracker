import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './container/schedule/schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';

const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  declarations: [ScheduleComponent, ScheduleCalendarComponent, ScheduleDaysComponent, ScheduleControlsComponent, ScheduleSectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class ScheduleModule { }
