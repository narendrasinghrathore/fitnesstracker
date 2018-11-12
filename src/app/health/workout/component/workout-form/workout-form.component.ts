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
    type: ['strength', [Validators.required]],
    strength: this.fb.group({
      reps: [1, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      sets: [1, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      weight: [1, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]]
    }),
    endurance: this.fb.group({
      duration: [1, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      distance: [1, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]]
    }),
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (this.workout && this.workout.name) {
      this.exist = true;
      this.form.patchValue({ ...this.workout });
    }
  }

  cancelWorkout() {
    this.router.navigate(['/health/workout']);
  }

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
