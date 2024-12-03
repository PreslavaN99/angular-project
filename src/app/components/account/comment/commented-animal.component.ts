import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-commented-animal',
  templateUrl: './commented-animal.component.html',
  standalone: true,
  styleUrls: ['./commented-animal.component.css']
})
export class CommentedAnimalComponent {
  @Input() animal: any;

  constructor(private router: Router) {
  }

  goToAnimalReadPage() {
    this.router.navigate([`/animal-read/${this.animal.id}`]);
  }
}
