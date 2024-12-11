
import {Component, OnInit} from '@angular/core';
import {Animal} from '../../../model/Animal';
import {AnimalService} from '../../../api/service/animal.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {LastTheeAnimalsComponent} from '../../lastThreeAnimals/last-thee-animals.component';

@Component({
  selector: 'app-animal-find',
  templateUrl: './animal-find.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink,
    LastTheeAnimalsComponent
  ],
  styleUrls: ['./animal-find.component.css']
})
export class AnimalFindComponent implements OnInit {
  animals: Animal[] = [];
  lastThreeAnimals: Animal[] = [];
  mostLiked: Animal[] = [];
  speciesOptions: string[] = ['cat', 'dog', 'other']; // Dropdown options
  selectedSpecies: string = ''; // Selected species

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.loadMostLikedAnimals();
    this.loadLastThreeAnimals();
  }

  getAnimalsBySpecies(): void {
    if (this.selectedSpecies) {
      this.animalService.getAnimalsFromDbByspecies(this.selectedSpecies).subscribe({
        next: (data: Animal[]) => {
          this.animals = data;
        },
        error: (err) => console.error(err)
      });
    } else {
      this.animals = [];
    }
  }

  private loadMostLikedAnimals(): void {
    this.animalService.getAnimalByMostLikes().subscribe({
      next: (data: Animal[]) => {
        this.mostLiked = data;
      },
      error: (err) => console.error(err)
    });
  }

  private loadLastThreeAnimals(): void {
    this.animalService.getLastThreeAnimals().subscribe({
      next: (data: Animal[]) => {
        this.lastThreeAnimals = data;
      },
      error: (err) => console.error(err)
    });
  }
}
