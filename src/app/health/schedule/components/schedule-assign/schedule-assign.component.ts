import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from 'src/interfaces/Meal';
import { Workout } from 'src/interfaces/Workout';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {

  @Input()
  list: Meal[] | Workout[];

  @Input()
  section: any;

  private selected: string[] = [];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  exist(name: string) {
    return !!~this.selected.indexOf(name);

  }

  toogleItem(name: string) {
    if (this.exist(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }

  }

  updateAssign() {
    const a = {[this.section.type]: this.selected};
    this.update.emit({
      [this.section.type]: this.selected
    });
  }
  cancelAssign() {
    this.cancel.emit();

  }

  getRoute(name: string) {
    return [`/health/${name}/new`];
  }

}
