import { Component, Input, OnInit } from '@angular/core';
import { Game, GameOwning } from '../../newInterfaces';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-complete-game-list',
  templateUrl: './complete-game-list.component.html',
})
export class CompleteGameListComponent implements OnInit {
  filteredGames: GameOwning[] | Game[];
  srcStr: string = '';

  @Input() games: Game[] | GameOwning[] = [];
  @Input() isOwned: boolean = false;

  constructor(private searchPipe: SearchPipe) {}

  ngOnInit(): void {
    this.filteredGames = this.games;
  }

  updateSrc(str: string): void {
    this.srcStr = str;
    this.filteredGames = this.searchPipe.transform(
      this.games,
      'title',
      this.srcStr
    );
  }
}
