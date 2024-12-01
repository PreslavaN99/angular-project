import {Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../api/service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hasLoginFailed: boolean = false;
  allFieldsRequired: boolean = false;
  userInfo = { hasLoginFailed: false };
  fieldsCheck = { allFields: false };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) {
      this.allFieldsRequired = true;
      this.fieldsCheck.allFields = true;
      return;
    }

    this.allFieldsRequired = false;
    this.fieldsCheck.allFields = false;
    const { username, password } = this.loginForm.value;

    this.authService.authJwtService(username, password).subscribe(
      (response: any) => {
        this.authService.login(username, response.token);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Login failed:', error);  // Log the error
        this.loginForm.get('password')?.reset();
        this.hasLoginFailed = true;
        this.userInfo.hasLoginFailed = true;
      }
    );
  }
}
