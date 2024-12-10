import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../api/service/user.service';
import {AuthService} from '../../api/service/authentication.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;
  fieldsCheck = {notMatch: false, allFields: false};
  dbError: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      repassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmitRegister(): void {
    const {username, password, repassword, email} = this.registerForm?.value || {};
    if (!username || !password || !repassword || !email) {
      this.fieldsCheck.allFields = true;
      return;
    }
    if (password !== repassword) {
      this.fieldsCheck.notMatch = true;
      return;
    }

    this.fieldsCheck.notMatch = false;
    this.fieldsCheck.allFields = false;

    this.userService.onRegister(username, password, email).subscribe(
      () => {
        this.dbError = [];
        this.authService.authJwtService(username, password).subscribe((response: any) => {
          console.log(response);
          this.authService.login(username, response.token);
          this.router.navigate(['/']);
        });
      },
      (err) => {
        if (err.status === 401) {
          console.log(err.error.cause);
          this.dbError = err.error.cause.split(', ');
          this.registerForm?.reset();
        } else {
          console.error(err);
          this.dbError = ['An error occurred during registration. Please try again.'];
        }
      }
    );
  }
}

