import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.css']
})
export class MinimapComponent implements OnInit {
  map: string[][] = [];
  player = { x: 2, y: 2 };

  ngOnInit() {
    this.map = this.generateMap();
  }

  private generateMap(): string[][] {
    const size = 5;
    const grid: string[][] = [];
    for (let y = 0; y < size; y++) {
      const row: string[] = [];
      for (let x = 0; x < size; x++) {
        row.push(x === this.player.x && y === this.player.y ? 'P' : '.');
      }
      grid.push(row);
    }
    return grid;
  }
}
