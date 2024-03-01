import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  throwError,
  tap,
  catchError,
  switchMap,
  Observable,
} from 'rxjs';
import { AuthData, lsAuth } from '../interfaces/User';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = environment.url;
  private authSubj = new BehaviorSubject<null | lsAuth>(null);
  user$ = this.authSubj.asObservable();
  user_!: lsAuth;

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: Partial<AuthData>) {
    const cleanUser = user;
    return this.http.post(`${this.url}auth/register`, cleanUser);
  }

  login(loginData: { email: string; password: string }) {
    return this.http.post<lsAuth>(`${this.url}auth/login`, loginData).pipe(
      tap((res) => {
        this.authSubj.next(res);
        this.user_ = res;
        localStorage.setItem('user-token', JSON.stringify(res));
        this.router.navigate(['']);
      })
    );
  }
}
