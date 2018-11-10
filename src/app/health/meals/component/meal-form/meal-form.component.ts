import { Component, Output, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { Meal } from 'src/interfaces/Meal';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit {
  @Input()
  meal: Meal;

  exist = false;

  @Output()
  create: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form = this.fb.group({
    name: ['', [Validators.required]],
    ingredients: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (this.meal && this.meal.name) {
      this.exist = true;
      this.form.patchValue({ ...this.meal });
      if (this.meal.ingredients) {
        for (const item of this.meal.ingredients) {
          this.addIngredient(item);
        }
      }
    }
  }

  cancelMeal() {
    this.router.navigate(['/health/meals']);
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient(value?: any) {
    this.ingredients.push(new FormControl(value || '', [Validators.required]));
  }

  removeItem(index: number) {
    this.ingredients.removeAt(index);
  }

  returnValidation(index: number): boolean {
    return this.ingredients.controls[index].hasError('required');
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

}
