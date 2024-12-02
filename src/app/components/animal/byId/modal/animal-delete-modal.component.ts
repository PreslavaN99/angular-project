import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AnimalService} from '../../../../api/service/animal.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-animal-delete-modal',
  templateUrl: './animal-delete-modal.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./animal-delete-modal.component.css']
})
export class AnimalDeleteModalComponent {
  @Input() id!: string;
  isOpen: boolean = false;

  constructor(private animalService: AnimalService, private router: Router) {
  }

  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  onDelete(): void {
    this.animalService.deleteAnimalById(this.id).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error(err)
    });
  }
}
