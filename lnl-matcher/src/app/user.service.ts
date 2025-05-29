import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  username = '';

  setUser(name: string) {
    this.username = name;
  }

  clearUser() {
    this.username = '';
  }
}
