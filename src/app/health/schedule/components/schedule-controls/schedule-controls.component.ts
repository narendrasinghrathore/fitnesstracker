import { Component, OnInit, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent implements OnInit {
  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  offset = 0;

  constructor() { }

  ngOnInit() {
  }

  navigate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }

}
