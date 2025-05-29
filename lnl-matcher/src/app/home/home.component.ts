import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
interface MatchRequest {
  name: string;
  department: string;
  interests: string;
  requestDate: string;
  scheduledDate?: string;
}

export class HomeComponent implements OnInit {
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
  requests: MatchRequest[] = [];

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('matchRequests');
    if (stored) {
      this.requests = JSON.parse(stored);
    } else {
      this.requests = this.generateSampleRequests();
      this.saveRequests();
    }
  }

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

  openDatePicker(input: HTMLInputElement) {
    if ((input as any).showPicker) {
      (input as any).showPicker();
    } else {
      input.focus();
      input.click();
    }
  }

  setSchedule(req: MatchRequest, date: string) {
    req.scheduledDate = date;
    this.saveRequests();
  }

  denyRequest(index: number) {
    this.requests.splice(index, 1);
    this.saveRequests();
  }

  private saveRequests() {
    localStorage.setItem('matchRequests', JSON.stringify(this.requests));
  }

  private generateSampleRequests(): MatchRequest[] {
    const samples: MatchRequest[] = [];
    for (let i = 1; i <= 5; i++) {
      samples.push({
        name: `User ${i}`,
        department: this.departments[(i - 1) % this.departments.length],
        interests: `Interest ${i}`,
        requestDate: new Date().toLocaleDateString(),
      });
    }
    return samples;
  }
}
