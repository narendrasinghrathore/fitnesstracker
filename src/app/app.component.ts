import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/interfaces/User';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fitnesstracker';

  user$: Observable<User>;
  subscription: Subscription;

  constructor(private store: Store,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.auth.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logoutUser() {
    this.auth.logout();
  }
}
