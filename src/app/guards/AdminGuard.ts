import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    let roles = sessionStorage.getItem('roles');
    let isAdmin = roles ? roles.includes('ROLE_ADMIN') : false;
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
