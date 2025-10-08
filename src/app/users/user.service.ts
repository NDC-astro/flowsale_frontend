import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

// Import the constant from the config file
import { api_Url } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '${api_Url}/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/');
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/', user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}/`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}
