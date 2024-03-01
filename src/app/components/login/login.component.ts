import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/interfaces/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private userSrv: UserServiceService) {}

  login() {
    // login

    this.userSrv.login(this.loginData.value).subscribe((res) => {
      if (typeof res !== 'string') {
        this.router.navigate(['/client']);
      } else {
      }
    });
  }
}
