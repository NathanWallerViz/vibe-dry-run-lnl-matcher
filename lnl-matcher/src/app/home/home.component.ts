import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface MatchRequest {
  name: string;
  department: string;
  interests: string;
  requestDate: string;
  status: 'pending' | 'accepted' | 'scheduled';
  scheduledDate?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
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
  showMatch = false;
  matchName = '';
  matchDept = '';
  matchingInterests: string[] = [];
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

  findMatch() {
    const names = ['Alex', 'Sam', 'Charlie', 'Taylor', 'Jordan', 'Robin', 'Casey', 'Riley', 'Jamie', 'Drew'];
    this.matchName = names[Math.floor(Math.random() * names.length)];
    this.matchDept = this.departments[Math.floor(Math.random() * this.departments.length)];
    const shuffled = [...this.interests].sort(() => Math.random() - 0.5);
    this.matchingInterests = shuffled.slice(0, Math.min(3, this.interests.length));
    this.showMatch = true;
  }

  resetForm() {
    this.selectedDept = '';
    this.interest = '';
    this.interests = [];
    this.showMatch = false;
  }

  confirmMatch() {
    this.requests.push({
      name: this.matchName,
      department: this.matchDept,
      interests: this.matchingInterests.join(', '),
      requestDate: new Date().toLocaleDateString(),
      status: 'pending'
    });
    this.saveRequests();
    this.resetForm();
  }

  denyMatch() {
    this.resetForm();
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
    req.status = 'scheduled';
    this.saveRequests();
  }

  denyRequest(index: number) {
    this.requests.splice(index, 1);
    this.saveRequests();
  }

  acceptRequest(req: MatchRequest) {
    req.status = 'accepted';
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
        status: 'pending'
      });
    }
    return samples;
  }
}
