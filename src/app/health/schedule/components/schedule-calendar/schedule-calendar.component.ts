import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { ScheduleItem } from 'src/interfaces/ScheduleItem';
import { ScheduleList } from 'src/interfaces/ScheduleList';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  selectedDay: Date;
  selectedDayIndex: number;
  selectedWeek: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snack and Drinks' }
  ];

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  items: ScheduleList;

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  constructor() { }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }


  ngOnInit() {
  }

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);

    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {

    return this.items && this.items[name] || {};
  }


  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectDay;
    this.select.emit({
      day, data, type,
      assigned, section
    });
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

}
