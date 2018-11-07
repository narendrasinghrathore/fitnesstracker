import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.authState.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      })
    );
  }
}
