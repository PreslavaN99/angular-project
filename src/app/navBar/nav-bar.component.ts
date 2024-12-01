import { Component, OnInit } from '@angular/core';
import {AuthService} from '../api/service/authentication.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf,
    NgClass
  ],
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: string | null = null;
  roles: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateUser();
    this.authService.loginState$.subscribe(() => {
      this.updateUser();
    });
  }

  updateUser(): void {
    this.user = sessionStorage.getItem('authenticatedUser');
    this.roles = sessionStorage.getItem('roles');
  }

  isAdmin(): boolean {
    return this.roles ? this.roles.includes('ROLE_ADMIN') : false;
  }
}
