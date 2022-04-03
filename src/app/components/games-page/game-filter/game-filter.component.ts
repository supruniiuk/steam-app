import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-game-filter',
  templateUrl: './game-filter.component.html',
  styleUrls: ['./game-filter.component.scss'],
})
export class GameFilterComponent implements OnInit {
  currentPrice: number;
  priceRange: { min: number; max: number };
  possibleTagOptions: string[] = ['indie', 'action', 'adventure'];

  tags: string[] = [];
  srcStr: string = '';

  @Input() games: Game[] = [];
  @Output() curPrice = new EventEmitter<number>();
  @Output() gameTypes = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void {
    this.setPricesRange();
  }

  setPricesRange() {
    const prices: number[] = this.games.map((g) => g.price);
    this.priceRange = { min: Math.min(...prices), max: Math.max(...prices) };
    this.currentPrice = this.priceRange.max;

    this.curPrice.emit(this.currentPrice);
  }

  setCurrentPrice(event: any): void {
    this.currentPrice = +event.target.value;
    this.curPrice.emit(this.currentPrice);
  }

  pickTag(): void {
    // Renderer2!!!!!!!!

    this.tags = [];
    const checked = document.querySelectorAll('input[name=tag]:checked');
    for (let i = 0; i < checked.length; i++) {
      this.tags.push(checked[i].getAttribute('value'));
    }

    this.gameTypes.emit(this.tags);
  }
}
