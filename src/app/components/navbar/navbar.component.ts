import { Component, OnInit } from '@angular/core';
import { lsAuth } from 'src/app/interfaces/User';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: lsAuth | null;

  constructor(private userSrv: UserServiceService) {}

  ngOnInit(): void {
    this.userSrv.user$.subscribe((_user) => {
      this.user = _user;
    });
  }
}
