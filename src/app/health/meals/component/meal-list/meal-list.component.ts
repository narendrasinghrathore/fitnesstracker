import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Meal } from 'src/interfaces/Meal';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  @Input()
  meals: Meal[];

  @Output()
  remove: EventEmitter<Meal> = new EventEmitter<Meal>();

  constructor() { }

  ngOnInit() {
  }

  getRoute(item: Meal) {
    return ['./', item.key];
  }

  removeItem(item: Meal) {
    this.remove.emit(item);
  }

}
