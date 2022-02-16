import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {
  currentPrice: number = 250;
  constructor() {}

  ngOnInit(): void {}

  setCurrentPrice(event: any): void {
    this.currentPrice = + event.target.value;
  }
}
