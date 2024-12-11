import { Component, Input } from '@angular/core';
import {Animal} from '../../../../model/Animal';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
  @Input() id!: number;

  commentsDisplay = false;
  isOpen = false;

  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  showComments(): void {
    this.commentsDisplay = true;
  }

  hideComments(): void {
    this.commentsDisplay = false;
  }

}
