import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface MatchRequest {
  name: string;
  department: string;
  interests: string;
  requestDate: string;
  scheduledDate?: string;
}

interface PendingRequest {
  name: string;
  department: string;
  interests: string;
  status: 'pending' | 'accepted' | 'scheduled';
  scheduleDate?: string;
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
  pendingRequests: PendingRequest[] = [];

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('matchRequests');
    if (stored) {
      this.requests = JSON.parse(stored);
    } else {
      this.requests = this.generateSampleRequests();
      this.saveRequests();
    }

    const pendingStored = localStorage.getItem('pendingRequests');
    if (pendingStored) {
      this.pendingRequests = JSON.parse(pendingStored);
    } else {
      this.pendingRequests = this.generateSamplePendingRequests();
      this.savePendingRequests();
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
    this.pendingRequests.push({
      name: this.matchName,
      department: this.matchDept,
      interests: this.matchingInterests.join(', '),
      status: 'pending'
    });
    this.savePendingRequests();
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
    this.saveRequests();
  }

  denyRequest(index: number) {
    this.requests.splice(index, 1);
    this.saveRequests();
  }

  private saveRequests() {
    localStorage.setItem('matchRequests', JSON.stringify(this.requests));
  }

  private savePendingRequests() {
    localStorage.setItem('pendingRequests', JSON.stringify(this.pendingRequests));
  }

  setPendingStatus(req: PendingRequest, status: 'accepted' | 'scheduled') {
    req.status = status;
    this.savePendingRequests();
  }

  setPendingSchedule(req: PendingRequest, date: string) {
    req.scheduleDate = date;
    req.status = 'scheduled';
    this.savePendingRequests();
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

  private generateSamplePendingRequests(): PendingRequest[] {
    const samples: PendingRequest[] = [];
    for (let i = 1; i <= 3; i++) {
      samples.push({
        name: `Pending User ${i}`,
        department: this.departments[(i - 1) % this.departments.length],
        interests: `Interest ${i}`,
        status: 'pending'
      });
    }
    return samples;
  }
}
