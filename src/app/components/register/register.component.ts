import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/interfaces/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private userSrv: UserServiceService) {}

  signup() {
    if (this.registerData.valid) {
      this.userSrv.signup(this.registerData.value).subscribe(
        (res) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
