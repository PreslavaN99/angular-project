import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../api/service/authentication.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
