import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  @Output()
  create: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form = this.fb.group({
    name: ['', [Validators.required]],
    ingredients: this.fb.array([])
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl('', [Validators.required]));
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


}
