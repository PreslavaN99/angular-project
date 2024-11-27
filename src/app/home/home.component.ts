import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/service/authentication.service';
import { AnimalService } from '../../api/service/animal.service';
import { Router } from '@angular/router';
import { ResetScroll } from '../../api/reset-scroll/reset-scroll';
import { LastTheeAnimalsComponent } from '../last-three-added/last-three-animals.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false;
  lastThreeAnimals: any[] = [];

  constructor(
    private authService: AuthService,
    private animalService: AnimalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Reset scroll position (потенциално глобална услуга за ресетиране на скрол)
    ResetScroll();

    // Проверка дали потребителят е логнат
    this.isLogin = this.authService.isUserLoggedIn();

    // Зареждане на последните 3 животни
    this.animalService.getLastThreeAnimals().subscribe(
      (data: any) => {
        this.lastThreeAnimals = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
