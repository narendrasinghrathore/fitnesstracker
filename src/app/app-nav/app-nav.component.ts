import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { User } from '../../interfaces/User';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { Tabs } from 'src/interfaces/Tabs';


@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app-nav.component.scss'],
  templateUrl: './app-nav.component.html'
})
export class AppNavComponent {
  @Input()
  user: User;

  constructor(private router: Router) {
  }

  @Output()
  logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit();
    this.router.navigate(['/auth/login']);
  }

}
