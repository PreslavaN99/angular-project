import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from './navBar/nav-bar.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    FooterComponent
  ]
})
export class LayoutComponent {}
