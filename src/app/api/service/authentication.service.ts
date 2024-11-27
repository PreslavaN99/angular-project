import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ROLES, USER_TOKEN } from '../../constants/constants';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Функция за автентикация на потребител
  authJwtService(username: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/authenticate`, { username, password });
  }

  // Функция за логване на потребител и записване на токен и роли в sessionStorage
  login(username: string, token: string): void {
    try {
      const decoded: any = jwtDecode(token); // Декодиране на JWT
      const roles: string[] = decoded['roles'] || []; // Получаване на ролите
      const joinedRoles = roles.join(' '); // Преобразуване на ролите в низ

      // Записване на данни в sessionStorage
      sessionStorage.setItem(USER_NAME_SESSION_ROLES, joinedRoles);
      sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
      sessionStorage.setItem(USER_TOKEN, token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // Проверка дали потребителят е логнат
  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  // Вземане на потребителското име на логнатия потребител
  getLoggedInUserName(): string {
    const user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null ? user : '';
  }
}
