import { Component, OnInit } from '@angular/core';
import { Tabs } from 'src/interfaces/Tabs';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  constructor() { }

  tabs: Tabs[] = [
    { path: 'schedule', label: 'Schedule' },
    { path: 'meals', label: 'Meals' },
    { path: 'workout', label: 'Workout Plans' },
  ];

  ngOnInit() {
  }

}
