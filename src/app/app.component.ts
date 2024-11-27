import { Component } from '@angular/core';
import { firstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';

@Component({
  selector: 'app-root',
  template: `
    <app-first></app-first>
    <app-second></app-second>
    <app-third></app-third>
  `,
  standalone: true,
  imports: [FirstComponent, SecondComponent, ThirdComponent] // Включване на стендалоун компоненти
})
export class AppComponent {}
