import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/shared/newInterfaces';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-approve-games',
  templateUrl: './approve-games.component.html',
})
export class ApproveGamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  srcStr: string = '';
  subs: Subscription[] = [];

  constructor(
    public gameService: GameService,
    private searchPipe: SearchPipe
  ) {}

  ngOnInit(): void {
    const gamesSubscription = this.gameService
      .getGamesForApprove()
      .subscribe((res) => {
        this.games = res;
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
}
