import { Component, OnInit, Input } from '@angular/core';
import { Meal } from 'src/interfaces/Meal';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  @Input()
  meals: Meal[];

  constructor() { }

  ngOnInit() {
  }

}
