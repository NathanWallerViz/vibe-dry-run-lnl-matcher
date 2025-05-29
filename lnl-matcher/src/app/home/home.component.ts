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
  requestsTab = 'Incoming';
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

  matchRequests: MatchRequest[] = [];

  ngOnInit() {
    const data = localStorage.getItem('matchRequests');
    if (data) {
      this.matchRequests = JSON.parse(data);
    } else {
      this.generateSampleRows();
    }
  }

  private saveRequests() {
    localStorage.setItem('matchRequests', JSON.stringify(this.matchRequests));
  }

  private generateSampleRows() {
    const samples: MatchRequest[] = [];
    for (let i = 1; i <= 5; i++) {
      samples.push({
        name: `User ${i}`,
        department: this.departments[i % this.departments.length],
        interests: 'Interest ' + i,
        requestDate: new Date().toISOString().slice(0, 10),
      });
    }
    this.matchRequests = samples;
    this.saveRequests();
  }

  setRequestsTab(tab: string) {
    this.requestsTab = tab;
  }

  filteredRequests() {
    return this.matchRequests.filter(r =>
      this.requestsTab === 'Incoming' ? !r.scheduledDate : !!r.scheduledDate
    );
  }

  openDatePicker(input: HTMLInputElement) {
    if ((input as any).showPicker) {
      (input as any).showPicker();
    } else {
      input.click();
    }
  }

  scheduleRequest(req: MatchRequest, date: string) {
    if (date) {
      req.scheduledDate = date;
      this.saveRequests();
    }
  }

  denyRequest(req: MatchRequest) {
    const index = this.matchRequests.indexOf(req);
    if (index >= 0) {
      this.matchRequests.splice(index, 1);
      this.saveRequests();
    }
  }

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
