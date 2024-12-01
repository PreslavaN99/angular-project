import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  API_URL,
  USER_NAME_SESSION_ATTRIBUTE_NAME,
  USER_NAME_SESSION_ROLES,
  USER_TOKEN
} from '../../constants/constants';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root', // Ensure this is present
})
export class AuthService {
  private loginState = new BehaviorSubject<boolean>(false);
  loginState$ = this.loginState.asObservable();

  constructor(private http: HttpClient) {
  }

  // Authenticate user and return the Observable of the HTTP response
  authJwtService(username: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/authenticate`, {username, password});
  }

  // Save user session details
  login(username: string, token: string): void {
    const decoded: any = jwtDecode(token);
    const roles = decoded['roles']?.join(' ') || '';

    sessionStorage.setItem(USER_NAME_SESSION_ROLES, roles);
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(USER_TOKEN, token);
    this.loginState.next(true);
  }

  // Remove user session details
  logout(): void {
    sessionStorage.removeItem(USER_NAME_SESSION_ROLES);
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(USER_TOKEN);
    this.loginState.next(false);
  }

  // Check if the user is logged in
  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  // Get the logged-in user's username
  getLoggedInUserName(): string {
    const user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user ?? '';
  }
}
