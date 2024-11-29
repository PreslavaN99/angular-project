import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/service/authentication.service';
/*import { AnimalService } from '../../api/service/animal.service';*/
import { Router } from '@angular/router';
import { from } from 'rxjs';
/*import { LastTheeAnimalsComponent } from '../last-three-added/last-three-animals.component';*/
import { FirstComponent } from './home-card/first/first.component';
import { SecondComponent } from './home-card/second/second.component';
import { ThirdComponent } from './home-card/third/third.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone:true;
  styleUrls: ['./home.component.css'],
  imports: [FirstComponent,SecondComponent,ThirdComponent],
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false;
  lastThreeAnimals: any[] = [];

  constructor(
    private authService: AuthService,
    /*private animalService: AnimalService,*/
    private router: Router
  ) { }

  ngOnInit(): void {

    // Проверка дали потребителят е логнат
    this.isLogin = this.authService.isUserLoggedIn();

    /*// Зареждане на последните 3 животни
    this.animalService.getLastThreeAnimals().subscribe(
      (data: any) => {
        this.lastThreeAnimals = data;
      },
      (error) => {
        console.error(error);
      }
    );*/
  }
}
