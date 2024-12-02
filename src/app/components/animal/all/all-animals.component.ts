// import {Component, Input, OnInit} from '@angular/core';
// import {AnimalService} from '../../../api/service/animal.service';
// import {AnimalBaseCardComponent} from './base/animal-base-card.component';
// import {NgForOf, NgIf} from '@angular/common';
// import {Animal} from '../../../model/Animal';
//
// @Component({
//   selector: 'app-all-animals',
//   templateUrl: './all-animals.component.html',
//   standalone: true,
//   imports: [
//     AnimalBaseCardComponent,
//     NgIf,
//     NgForOf
//   ],
//   styleUrls: ['./all-animals.component.css']
// })
// export class AllAnimalsComponent implements OnInit {
//   @Input() animals: Animal | undefined;
//   @Input() id: number = 0;
//
//   constructor(private animalService: AnimalService) {}
//
//   ngOnInit(): void {
//     this.resetScroll();
//     this.getAllAnimals();
//   }
//
//   resetScroll(): void {
//     window.scrollTo(0, 0);
//   }
//
//   getAllAnimals(): void {
//     this.animalService.getAllAnimal().subscribe({
//       next: (data) => {
//         console.log(data);
//         this.animals = data;
//       },
//       error: (err) => console.error(err)
//     });
//   }
// }
