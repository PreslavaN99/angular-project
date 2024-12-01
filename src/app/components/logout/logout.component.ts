import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../api/service/authentication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  @Input() onLogout: () => void = () => {
  }; // You can use this to handle logout in parent components

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.logout(); // Call the logout logic from AuthService
    this.onLogout();  // Notify the parent component about the logout
    this.router.navigate(['/']); // Redirect to home page
  }
}
