import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/shared/newInterfaces';
import { GameFilterPipe } from 'src/app/shared/pipes/gameFilter.pipe';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {
  subs: Subscription[] = [];
  games: Game[] = [];
  filteredGames: Game[] = [];
  srcStr: string = '';
  currentPrice: number;
  tags: Array<string> = [];

  constructor(
    public gameService: GameService,
    private searchPipe: SearchPipe,
    private filterPipe: GameFilterPipe
  ) {}

  ngOnInit(): void {
    const gamesSubscription = this.gameService
      .getAllGames()
      .subscribe((res) => {
        this.games = res;
        this.games.sort(function (a, b) {
          return a.createdAt < b.createdAt
            ? 1
            : a.createdAt > b.createdAt
            ? -1
            : 0;
        });
        this.filteredGames = this.games;
      });

    this.subs.push(gamesSubscription);
  }

  filterGame() {
    this.filteredGames = this.filterPipe.transform(
      this.games,
      this.currentPrice,
      this.tags
    );

    this.filteredGames = this.searchPipe.transform(
      this.filteredGames,
      'title',
      this.srcStr
    );
  }

  setCurrentPrice(value: number) {
    this.currentPrice = value;
    this.filterGame();
  }

  setTags(value: string[]) {
    this.tags = value;
    this.filterGame();
  }

  updateSrc(str: string): void {
    this.srcStr = str;
    this.filterGame();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
