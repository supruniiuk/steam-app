import { Component, OnInit } from '@angular/core';
import { Game, GameResponse } from 'src/app/shared/interfaces';

import { AuthService } from 'src/app/core/services/auth.service';
import { GameFilterPipe } from 'src/app/shared/pipes/gameFilter.pipe';
import { GameOwningService } from 'src/app/core/services/gameOwning.service';
import { GameService } from 'src/app/core/services/games.service';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {
  subs: Subscription[] = [];
  games: Game[];
  filteredGames: Game[];
  srcStr: string = '';
  currentPrice: number;
  tags: Array<string> = [];
  count: number;
  role: string;

  constructor(
    public gameService: GameService,
    private authService: AuthService,
    private gameOwningService: GameOwningService,
    private searchPipe: SearchPipe,
    private filterPipe: GameFilterPipe
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.getAllGames();
  }

  getAllGames(page: number = 1): void {
    const gamesSubscription = this.gameService
      .getAllGames(page)
      .subscribe((res: GameResponse) => {
        this.games = res.games;
        this.count = Math.ceil(res.count / 30);

        this.sortGamesByDate();
        this.filteredGames = [...this.games];
        if (this.role == 'gamer') {
          this.getOwnGames();
        }
      });

    this.subs.push(gamesSubscription);
  }

  sortGamesByDate(): void {
    this.games.sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });
  }

  getOwnGames(): void {
    const getOwnGames = this.gameOwningService
      .getAllOwnings()
      .subscribe((res) => {
        this.games = this.games.filter((game) => res.indexOf(game.id) === -1);
        this.filteredGames = [...this.games];
      });
      
    this.subs.push(getOwnGames);
  }

  filterGame(): void {
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

  setCurrentPrice(value: number): void {
    this.currentPrice = value;
    this.filterGame();
  }

  setTags(value: string[]): void {
    this.tags = value;
    this.filterGame();
  }

  updateSrc(str: string): void {
    this.srcStr = str;
    this.filterGame();
  }

  changePage(page: number): void {
    this.getAllGames(page);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
