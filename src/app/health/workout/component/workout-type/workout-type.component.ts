import { Component, forwardRef, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  value = 'endurance';
  selectors = ['strength', 'endurance'];

  private onTouch: Function;
  private onModelChange: Function;

  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectType(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }



  constructor() { }

  ngOnInit() {
  }

}
