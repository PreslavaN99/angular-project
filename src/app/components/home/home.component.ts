import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../api/service/authentication.service';
import { AnimalService } from '../../api/service/animal.service';
import {LastTheeAnimalsComponent} from '../lastThreeAnimals/last-thee-animals.component';
import {NgForOf, NgIf} from '@angular/common';
import {FirstComponent} from './home-card/first/first.component';
import {SecondComponent} from './home-card/second/second.component';
import {ThirdComponent} from './home-card/third/third.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    LastTheeAnimalsComponent,
    NgIf,
    RouterLink,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    NgForOf,

  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false;
  lastTreeAnimals: any[] = [];

  constructor(
    protected authService: AuthService,
    private animalService: AnimalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isUserLoggedIn();

    // Fetch last three animals
    this.animalService.getLastThreeAnimals().subscribe(
      (data) => {
        this.lastTreeAnimals = data;
      },
      (err) => {
        console.error('Error fetching animals:', err);
      }
    );
  }
}
