import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  onRegister(username: string, password: string, email: string): Observable<any> {
    const user = { username, password, email };
    return this.http.post(`${API_URL}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${API_URL}/account/${username}`, {
      headers: this.headers
    });
  }

  getAllUsersBySimilarUsername(username: string): Observable<any> {
    return this.http.get(`${API_URL}/${username}`, {
      headers: this.headers
    });
  }

  removeRoleOnUser(username: string): Observable<any> {
    return this.http.put(`${API_URL}/role/${username}`, null, {
      headers: this.headers
    });
  }

  upgradeRoleOnUser(username: string): Observable<any> {
    return this.http.put(`${API_URL}/role-admin/${username}`, null, {
      headers: this.headers
    });
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${API_URL}/user/${username}`, {
      headers: this.headers
    });
  }
}
