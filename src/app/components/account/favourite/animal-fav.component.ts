import {Component, Input, EventEmitter, Output} from '@angular/core';
import {AnimalService} from '../../../api/service/animal.service';

@Component({
  selector: 'app-animal-fav',
  templateUrl: './animal-fav.component.html',
  standalone: true,
  styleUrls: ['./animal-fav.component.css']
})
export class AnimalFavComponent {
  @Input() animal: any;
  @Input() username: string | undefined;
  @Output() favouritesUpdated = new EventEmitter<any[]>();

  @Input()
  set favouritesAnimal(value: any[] | null) {
    // Ensure that favouritesAnimal is always an array, even if the input is null
    this._favouritesAnimal = value || [];
  }

  get favouritesAnimal(): any[] {
    return this._favouritesAnimal;
  }

  private _favouritesAnimal: any[] = [];


  constructor(private animalService: AnimalService) {
  }

  getFormattedDate(dateString: string): string {
    return dateString ? dateString.split('T')[0] : 'N/A';
  }

  deleteFavAnimal({username, id}: { username: string, id: string }): void {
    this.animalService.deleteFavAnimalByUsernameAndId(username, id).subscribe(
      data => {
        // Emit updated list of favourite animals instead of mutating the input array
        const updatedFavourites = this.favouritesAnimal.filter(x => x.id !== id);
        this.favouritesUpdated.emit(updatedFavourites); // Emit updated list
      },
      err => console.error(err)
    );
  }

  onDelete(): void {
    this.deleteFavAnimal({username: this.username || '', id: this.animal.id});
  }
}

