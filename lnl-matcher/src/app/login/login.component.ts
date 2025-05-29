import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    this.userService.setUser(this.username);
    this.router.navigate(['/home']);
  }

  cancel() {
    this.username = '';
    this.password = '';
  }
}
