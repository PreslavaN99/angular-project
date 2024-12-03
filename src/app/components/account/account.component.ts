import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../api/service/animal.service';
import { AuthService } from '../../api/service/authentication.service';
import { CommentedAnimalComponent } from './comment/commented-animal.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AnimalFavComponent } from './favourite/animal-fav.component';
import { UserService } from '../../api/service/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [
    CommentedAnimalComponent,
    RouterLink,
    NgIf,
    NgForOf,
    AnimalFavComponent,
    AsyncPipe
  ],
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  username: string;
  user: any = {};
  roles: string[] = [];
  favouritesAnimal: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Always an array, never null
  commentedAnimals: any[] = [];
  date: string = '';

  constructor(
    private animalService: AnimalService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.username = this.authService.getLoggedInUserName();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadCommentedAnimals();
    this.loadFavouritesAnimals();
  }

  loadUserData() {
    this.userService.getUserByUsername(this.username).subscribe(
      data => {
        this.user = data;
        this.roles = data.authorities.map((x: any) => x.authority.replace('ROLE_', '').toLowerCase()).join(', ');
        this.date = data?.createdAt.split('T')[0];
      },
      err => console.error(err)
    );
  }

  loadCommentedAnimals() {
    this.animalService.getCommentedAnimalByUsername(this.username).subscribe(
      data => {
        this.commentedAnimals = data;
      },
      err => console.error(err)
    );
  }

  loadFavouritesAnimals() {
    this.animalService.getFavouritesAnimalByUsername(this.username).subscribe(
      data => {
        // Ensure the data is not null
        this.favouritesAnimal.next(data || []);
      },
      err => console.error(err)
    );
  }

  handleUpdatedFavourites(updatedFavourites: any[]) {
    this.favouritesAnimal.next(updatedFavourites);
  }
}
