import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    let roles = sessionStorage.getItem('roles');
    let isAdmin = roles ? roles.includes('ROLE_ADMIN') : false;

    if (isAdmin) {
      return true; // Потребителят има роля на администратор, може да достъпи страницата.
    } else {
      this.router.navigate(['/']); // Пренасочване към началната страница.
      return false;
    }
  }
}
