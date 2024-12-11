import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnimalService} from '../../../api/service/animal.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  standalone: true
})
export class AnimalComponent implements OnInit {
  animal: any = {};
  comments: any[] = [];
  peopleWhoLiked: string = '';
  favAnimal: boolean = false;
  ownerOfAnimal: boolean = false;
  wantToAdopt: boolean = false;
  animalUsers: any[] = [];
  likes: number = 0;
  allReadyLiked: boolean = false;
  added: string = '';
  dbError: string[] = [];
  fieldsCheck = {allFields: false};
  username: string | null = sessionStorage.getItem('authenticatedUser');
  newComment: string = ''; // Добавена променлива за свързване с инпут полето

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadAnimalData(id);
    this.loadFavouriteStatus();
  }

  loadAnimalData(id: string): void {
    this.animalService.getAnimalById(id).subscribe({
      next: (data) => {
        this.animal = data;
        this.ownerOfAnimal = data.createdBy === this.username;
        this.peopleWhoLiked = data.likes.map((x: any) => x.ownerOfLike).join(', ');
        this.comments = data.comments;
        this.added = data.createdAt.split('T')[0];
        this.likes = data.likes.length;
        this.allReadyLiked = data.likes.some((x: any) => x.ownerOfLike === this.username);
        this.wantToAdopt = data.users.some((x: any) => x.username === this.username);
        this.loadAdopters();
      },
      error: (err) => console.error(err),
    });
  }

  loadFavouriteStatus(): void {
    this.animalService
      .getFavouritesAnimalByUsername(this.username!)
      .subscribe((data) => {
        this.favAnimal = data.some((x: any) => x.id === this.animal.id);
      });
  }

  loadAdopters(): void {
    this.animalService
      .findAllUsersWhoWantToAdoptByAnimalId(this.animal.id)
      .subscribe({
        next: (data) => (this.animalUsers = data),
        error: (err) => console.error(err),
      });
  }

  addComment(): void {
    if (!this.newComment || this.newComment.trim().length < 2) {
      this.fieldsCheck.allFields = true;
      return;
    }
    this.fieldsCheck.allFields = false;

    const comment = {
      info: this.newComment,
      animalId: this.animal.id,
      ownerOfComment: this.username,
    };

    this.animalService.onAddComment(this.newComment, this.animal.id, this.username).subscribe({
      next: (data) => {
        if (data.cause) {
          this.dbError = data.cause.split(', ');
          return;
        }
        this.comments.push(data);
        this.newComment = ''; // Изчистване на полето за коментари
      },
      error: (err) => console.error(err),
    });
  }

  deleteComment(commentId: string): void {
    this.animalService.onDeleteComment(commentId).subscribe({
      next: (data) => {
        this.comments = this.comments.filter((c) => c.id !== data.id);
      },
      error: (err) => console.error(err),
    });
  }

  addLike(): void {
    this.animalService.addLike(this.username!, this.animal.id).subscribe();
    this.likes++;
    this.allReadyLiked = true;
    this.peopleWhoLiked += `, ${this.username}`;
  }

  addToFavourites(): void {
    this.animalService.addFavouriteAnimalToUser(this.username!, this.animal.id).subscribe();
    this.favAnimal = true;
  }

  adoptAnimal(): void {
    this.animalService.adoptAnimalByUser(this.username!, this.animal.id).subscribe({
      next: () => {
        this.wantToAdopt = true;
        this.loadAdopters();
      },
      error: (err) => console.error(err),
    });
  }

  removeAdoptAnimal(): void {
    this.animalService.removeAnimalFromUser(this.username!, this.animal.id).subscribe({
      next: () => {
        this.wantToAdopt = false;
        this.loadAdopters();
      },
      error: (err) => console.error(err),
    });
  }
}
