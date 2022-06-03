import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, GameResponse } from 'src/app/shared/interfaces';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { GameService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-approve-games',
  templateUrl: './approve-games.component.html',
})
export class ApproveGamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[];
  srcStr: string = '';
  subs: Subscription[] = [];

  count: number;

  constructor(
    public gameService: GameService,
    private searchPipe: SearchPipe
  ) {}

  ngOnInit(): void {
    this.getGamesForApprove();
  }

  getGamesForApprove(page: number = 1) {
    const gamesSubscription = this.gameService
      .getGamesForApprove(page)
      .subscribe((res: GameResponse) => {
        this.games = res.games;
        this.count = Math.ceil(res.count / 30);
        this.sortGames();

        this.filteredGames = this.games;
      });

    this.subs.push(gamesSubscription);
  }

  sortGames(): void {
    this.games.sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });
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
    this.getGamesForApprove(page);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
