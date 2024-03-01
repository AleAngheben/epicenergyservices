import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { AuthData } from '../interfaces/User';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = environment.url;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // register(data: {
  //   username: string;
  //   name: string;
  //   surname: string;
  //   email: string;
  //   password: string;
  // }) {
  //   return this.http.post(`${this.url}auth/register`, data);
  // }

  signup(user: Partial<AuthData>) {
    const cleanUser = user;
    return this.http.post(`${this.url}auth/register`, cleanUser);
  }
}
