import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { User } from '../../interfaces/User';
import { EventEmitter } from '@angular/core';


@Component({
    selector: 'app-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./app-nav.component.scss'],
    template: `
    <mat-toolbar color="primary">
  <mat-toolbar-row>
  <span>
  <mat-menu #menu="matMenu">
  <button [disabled]="user?.authenticated" [routerLink]="['/auth/login']" routerLinkActive="router-link-active" mat-menu-item>
    <mat-icon>fingerprint</mat-icon>
    <span>Login</span>
  </button>
  <button [disabled]="user?.authenticated" [routerLink]="['/auth/register']" routerLinkActive="router-link-active" mat-menu-item>
    <mat-icon>account_circle</mat-icon>
    <span>Register</span>
  </button>
  <button mat-menu-item disabled>
    <mat-icon>notifications_off</mat-icon>
    <span>Disable alerts</span>
  </button>
</mat-menu>
<button class="menu" mat-icon-button [matMenuTriggerFor]="menu">
    <mat-icon>more_vert</mat-icon>
  </button>
  </span>
    <span>App User</span>
    <mat-icon  matTooltip="User verified" class="app-nav-icon" *ngIf="user?.authenticated">
    verified_user
    </mat-icon>
    <span class="app-nav-spacer"></span>
    <mat-icon  matTooltip="Logout user" class="app-nav-icon" (click)="logoutUser()" *ngIf="user?.authenticated">
    power_off
    </mat-icon>
  </mat-toolbar-row>
</mat-toolbar>
    `
})
export class AppNavComponent {
    @Input()
    user: User;

    @Output()
    logout = new EventEmitter<any>();

    logoutUser() {
        this.logout.emit();
    }

}
