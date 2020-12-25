import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../cliente/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API = 'https://api.github.com'
  constructor(private http:HttpClient) { }

  // getAll(): Observable<User[]>{
  //   return this.http.get<User[]>(`${this.API}/users`)
  // }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.API}/users`)
  }
}
