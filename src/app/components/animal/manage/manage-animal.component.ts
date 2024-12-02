import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AnimalService} from '../../../api/service/animal.service';
import {AnimalCardComponent} from './card/animal-card.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-manage-animal',
  templateUrl: './manage-animal.component.html',
  standalone: true,
  imports: [
    AnimalCardComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./manage-animal.component.css']
})
export class ManageAnimalComponent implements OnInit {
  animals: any[] = [];

  constructor(private animalService: AnimalService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalService.getAnimalByUsername().subscribe({
      next: (data) => (this.animals = data),
      error: (err) => console.error(err)
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/animal-add']);
  }
}
