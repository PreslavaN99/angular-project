import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  standalone: true,
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent {
  @Input() animal!: any;

  constructor(private router: Router) {
  }

  get formattedDate(): string {
    return this.animal?.createdAt?.split('T')[0] || '';
  }

  navigateToEdit(): void {
    this.router.navigate([`/animal/${this.animal.id}`]);
  }

  navigateToView(): void {
    this.router.navigate([`/animal-read/${this.animal.id}`]);
  }
}
