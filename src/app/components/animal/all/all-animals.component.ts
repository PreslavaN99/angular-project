import { Component, OnInit } from '@angular/core';
import {AnimalService} from '../../../api/service/animal.service';
import {AnimalCardComponent} from './base/animal-base-card.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-all-animals',
  templateUrl: './all-animals.component.html',
  styleUrls: ['./all-animals.component.css'],
  imports: [
    AnimalCardComponent,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class AllAnimalsComponent implements OnInit {
  animals: any[] = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.animalService.getAllAnimal().subscribe(
      (data) => (this.animals = data),
      (error) => console.error(error)
    );
  }
}
