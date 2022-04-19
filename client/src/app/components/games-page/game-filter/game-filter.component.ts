import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Game } from 'src/app/shared/newInterfaces';

@Component({
  selector: 'app-game-filter',
  templateUrl: './game-filter.component.html',
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
  @ViewChildren('tag') checked: QueryList<ElementRef>;

  constructor() {}

  ngOnInit(): void {
    this.setPricesRange();
  }

  getCheckedTags() {
    const tags = this.checked.toArray().filter((t) => t.nativeElement.checked);
    return tags.map((tag) => tag.nativeElement.value);
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
    this.tags = this.getCheckedTags();
    this.gameTypes.emit(this.tags);
  }
}
