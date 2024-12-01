import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LowerCasePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-last-thee-animals',
  templateUrl: './last-thee-animals.component.html',
  standalone: true,
  imports: [
    RouterLink,
    LowerCasePipe,
    NgOptimizedImage
  ],
  styleUrls: ['./last-thee-animals.component.css']
})
export class LastTheeAnimalsComponent {
  @Input() animal: any;  // Input property to receive animal data
}
