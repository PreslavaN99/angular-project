import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appResetScroll]'
})
export class ResetScrollDirective {
  constructor() {}

  @HostListener('window:load', ['$event'])
  onWindowLoad() {
    window.scrollTo(0, 0);
  }
}
