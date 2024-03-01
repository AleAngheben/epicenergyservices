import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/interfaces/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private userSrv: UserServiceService) {}

  login(form: NgForm) {
    try {
      this.userSrv.login(form.value).subscribe();
    } catch (error) {
      alert('Could not complete request. Please try again.');
      this.router.navigate(['']);
    }
  }
}
