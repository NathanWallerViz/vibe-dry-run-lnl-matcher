import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public userService: UserService, private router: Router) {}

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/']);
  }
}
