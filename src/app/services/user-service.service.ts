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
  private authSubj = new BehaviorSubject<null | AuthData>(null);

  private $user = new BehaviorSubject<Partial<AuthData> | null>(null);
  user = this.$user.asObservable() as Observable<AuthData>;

  private $isLoggedIn = new BehaviorSubject(false);
  isLoggedIn = this.$isLoggedIn.asObservable();
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

  login(loginData: Partial<AuthData>) {
    return this.http.post<lsAuth>('${this.url}auth/login', loginData).pipe(
      switchMap((res) => {
        localStorage.setItem('pkmn-token', res.accessToken);
        this.$isLoggedIn.next(true);
        return this.http.get<lsAuth>(
          'http://localhost:3000/users/' + res.user.id
        );
      }),
      tap((res) => {
        const noPassUser = res as Partial<AuthData>;
        delete noPassUser.password;
        this.$user.next(noPassUser);
      })
    );
  }
}
