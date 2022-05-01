import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, GameResponse } from 'src/app/shared/interfaces';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-dev-games',
  templateUrl: './dev-games.component.html',
  styleUrls: ['./dev-games.component.scss'],
})
export class DevGamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  srcStr: string = '';
  subs: Subscription[] = [];
  count: number;

  constructor(
    public gameService: GameService,
    private searchPipe: SearchPipe
  ) {}

  ngOnInit(): void {
    this.getDevGames();
  }

  getDevGames(page: number = 1) {
    const gamesSubscription = this.gameService
      .getDevGames(page)
      .subscribe((res: GameResponse) => {
        this.games = res.games;
        this.count = Math.ceil(res.count / 15);

        this.filterGames();
        this.filteredGames = this.games;
      });

    this.subs.push(gamesSubscription);
  }

  filterGames() {
    this.games.sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });
  }

  addGame(game: Game): void {
    this.games.unshift(game);
  }

  updateSrc(str: string): void {
    this.srcStr = str;
    this.filteredGames = this.searchPipe.transform(
      this.games,
      'title',
      this.srcStr
    );
  }

  changePage(page: number): void {
    this.getDevGames(page);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
