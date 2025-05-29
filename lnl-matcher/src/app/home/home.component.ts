import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeTab = 'Match';
  departments = [
    'Viztech',
    'Reporting',
    'Sales',
    'Marketing',
    'Data',
    'Development',
    'Quality Engineering',
    'Snack Shelf Stocking',
    'Cold Brew Manager',
    'Taco Truck Driver',
    'Court Jester',
    'Construction Crew',
    'Golf Simulator User',
    'Vibe Code Specialist',
    "Help I Don't Know How I Got Here"
  ];

  selectedDept = '';
  interest = '';
  interests: string[] = [];
  showSuccess = false;

  constructor(public userService: UserService, private router: Router) {}

  setTab(tab: string) {
    this.activeTab = tab;
  }

  addInterest() {
    const trimmed = this.interest.trim();
    if (trimmed) {
      this.interests.push(trimmed);
      this.interest = '';
    }
  }

  submit() {
    this.showSuccess = true;
  }

  resetForm() {
    this.selectedDept = '';
    this.interest = '';
    this.interests = [];
    this.showSuccess = false;
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/']);
  }
}
