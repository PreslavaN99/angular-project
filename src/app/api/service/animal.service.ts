// src/app/services/animal.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  onCreate(form: FormData): Observable<any> {
    return this.http.post(`${API_URL}/animal`, form, { headers: this.getHeaders() });
  }

  onAddComment(info: string, animalId: string, ownerOfComment: string): Observable<any> {
    const comment = { info, animalId, ownerOfComment };
    return this.http.post(`${API_URL}/add/comment/:${animalId}`, comment, {
      headers: this.getHeaders().set('Content-Type', 'application/json')
    });
  }

  onDeleteComment(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/delete/comment/:${id}`, { headers: this.getHeaders() });
  }

  addLike(username: string, id: string): Observable<any> {
    return this.http.post(`${API_URL}/add/like/:${id}/:${username}`, {}, { headers: this.getHeaders() });
  }

  getAnimalByUsername(): Observable<any> {
    const username = sessionStorage.getItem('authenticatedUser');
    return this.http.get(`${API_URL}/animal-manage/:${username}`, { headers: this.getHeaders() });
  }

  getAnimalById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/animal/:${id}`, {
      headers: this.getHeaders().set('info-Type', 'application/json')
    });
  }

  editAnimalById(form: FormData, id: string): Observable<any> {
    return this.http.put(`${API_URL}/animal/:${id}`, form, { headers: this.getHeaders() });
  }

  deleteAnimalById(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/animal/:${id}`, {
      headers: this.getHeaders().set('info-Type', 'application/json')
    });
  }

  getLastThreeAnimals(): Observable<any> {
    return this.http.get(`${API_URL}/lastTheeAnimals`);
  }

  getAnimalsFromDbByspecies(species: string): Observable<any> {
    return this.http.get(`${API_URL}/animal_by_species/:${species}`, { headers: this.getHeaders() });
  }

  getAnimalByMostLikes(): Observable<any> {
    return this.http.get(`${API_URL}/animal-by-most-likes`, { headers: this.getHeaders() });
  }

  getFavouritesAnimalByUsername(username: string): Observable<any> {
    return this.http.get(`${API_URL}/favourites/:${username}`, { headers: this.getHeaders() });
  }

  addFavouriteAnimalToUser(username: string, id: string): Observable<any> {
    return this.http.post(`${API_URL}/favourite/:${id}/:${username}`, {}, { headers: this.getHeaders() });
  }

  deleteFavAnimalByUsernameAndId(username: string, id: string): Observable<any> {
    return this.http.delete(`${API_URL}/favourite/:${id}/:${username}`, {
      headers: this.getHeaders().set('info-Type', 'application/json')
    });
  }

  getAllAnimal(): Observable<any> {
    return this.http.get(`${API_URL}/find-all`, { headers: this.getHeaders() });
  }

  getCommentedAnimalByUsername(username: string): Observable<any> {
    return this.http.get(`${API_URL}/animal-by-comments/:${username}`, { headers: this.getHeaders() });
  }

  adoptAnimalByUser(username: string, animalId: string): Observable<any> {
    const data = { username, animalId };
    return this.http.post(`${API_URL}/adopt`, data, {
      headers: this.getHeaders().set('Content-Type', 'application/json')
    });
  }

  removeAnimalFromUser(username: string, animalId: string): Observable<any> {
    const data = { username, animalId };
    return this.http.post(`${API_URL}/remove_adopt`, data, {
      headers: this.getHeaders().set('Content-Type', 'application/json')
    });
  }

  findAllUsersWhoWantToAdoptByAnimalId(animalId: string): Observable<any> {
    return this.http.get(`${API_URL}/users_wanted_to_adopt/${animalId}`, {
      headers: this.getHeaders().set('Content-Type', 'application/json')
    });
  }
}
