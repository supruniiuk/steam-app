import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/shared/newInterfaces';
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

  constructor(
    public gameService: GameService,
    private searchPipe: SearchPipe
  ) {}

  ngOnInit(): void {
    const gamesSubscription = this.gameService
      .getDevGames()
      .subscribe((res) => {
        this.games = res;
        this.filterGames()
        this.filteredGames = this.games;
      });

    this.subs.push(gamesSubscription);
  }

  filterGames(){
    this.games.sort(function (a, b) {
      return a.createdAt < b.createdAt
        ? 1
        : a.createdAt > b.createdAt
        ? -1
        : 0;
    });
  }

  addGame(game: any): void {
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

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
