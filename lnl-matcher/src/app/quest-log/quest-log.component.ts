import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quest-log',
  templateUrl: './quest-log.component.html',
  styleUrls: ['./quest-log.component.css']
})
export class QuestLogComponent {
  @Input() matchCount = 0;

  quests = [
    { title: 'Get 3 matches', goal: 3 }
  ];

  progress(q: {title: string, goal: number}) {
    if (q.title === 'Get 3 matches') {
      const count = Math.min(this.matchCount, q.goal);
      return `${count}/${q.goal}${count >= q.goal ? ' ✅' : ''}`;
    }
    return '';
  }
}
