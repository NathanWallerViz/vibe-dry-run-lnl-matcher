import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.css']
})
export class HealthBarComponent implements OnInit, OnDestroy {
  health = 100;
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.health -= 1;
      if (this.health <= 0) {
        this.health = 100;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
