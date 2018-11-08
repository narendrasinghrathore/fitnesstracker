import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

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
    console.log(this.form.value);
  }

}
