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
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  // signup() {
  //   if (this.registerData) {
  //     this.userSrv.signup(this.registerData.value).subscribe((res) => {
  //       if (typeof res === 'string') {
  //       } else {
  //         this.router.navigate(['']);
  //       }
  //     });
  //   } else alert('Form is invalid');
  //}

  //   this.form = this.fb.group({
  //     name: this.fb.control(null, [Validators.required]),
  //     lastName: this.fb.control(null, [Validators.required]),
  //     username: this.fb.control(null, [Validators.required]),
  //     email: this.fb.control(null, [Validators.required, Validators.email]),
  //     password: this.fb.control(null, [
  //       Validators.required,
  //       Validators.maxLength(8),
  //     ]),
  //   });
  // }

  // geterrorsC(name: string, error: string) {
  //   return this.form.get(name)?.errors![error];
  // }

  // getFormC(nome: string) {
  //   return this.form.get(nome);
  // }

  // signUp() {
  //   console.log(this.registerData.value);
  //   try {
  //     this.userSrv.register(this.registerData.value).subscribe();
  //     this.router.navigate(['/login']);
  //   } catch (error: any) {
  //     console.log(error);
  //     alert('Email già registrata');
  //     this.router.navigate(['/register']);
  //   }
  // }
}
