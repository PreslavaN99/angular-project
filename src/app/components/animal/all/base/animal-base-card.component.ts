import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-animal-base-card',
  templateUrl: './animal-base-card.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./animal-base-card.component.css']
})
export class AnimalBaseCardComponent {
  @Input() animal?: {
    id: string; // Add the id property
    likes?: { ownerOfLike: string }[];
    comments?: { content: string }[];
    name: string;
    species: string;
  };
  @Input() id!: number;

  comments = {
    commentsData: this.animal?.comments || [],
    display: false
  };

  isOpen: boolean = false;

  constructor(private router: Router) {}

  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  changeR(event: MouseEvent): void {
    (event.target as HTMLElement).style.color = 'red';
  }

  changeL(event: MouseEvent): void {
    (event.target as HTMLElement).style.color = 'lightblue';
  }

  hideComments(): void {
    this.comments.display = false;
  }

  showComments(): void {
    this.comments.display = true;
  }

  viewAnimal(): void {
    if (this.animal?.id) {  // Make sure the id is defined
      this.router.navigate(['/animal-read', this.animal.id]);
    } else {
      console.error('Animal ID is missing!');
    }
  }
}
