import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Workout } from 'src/interfaces/Workout';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {

  @Input()
  workout: Workout;

  exist = false;

  @Output()
  create: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form = this.fb.group({
    name: ['', [Validators.required]],
    type: ['strength', [Validators.required]]
  });
  // ingredients: this.fb.array([])

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (this.workout && this.workout.name) {
      this.exist = true;
      this.form.patchValue({ ...this.workout });
      // if (this.workout.strength) {
      //   for (const item of this.workout.strength) {
      //     this.addStrength(item);
      //   }
      // }
    }
  }

  cancelWorkout() {
    this.router.navigate(['/health/workout']);
  }

  // get ingredients() {
  //   return this.form.get('ingredients') as FormArray;
  // }

  // addStrength(value?: any) {
  //   this.ingredients.push(new FormControl(value || '', [Validators.required]));
  // }

  // removeItem(index: number) {
  //   this.ingredients.removeAt(index);
  // }

  // returnValidation(index: number): boolean {
  //   return this.ingredients.controls[index].hasError('required');
  // }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

}
