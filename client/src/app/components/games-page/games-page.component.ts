import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/shared/newInterfaces';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {
  subs: Subscription[] = [];
  games: Game[] = [];
  srcStr: string = '';
  currentPrice: number;
  tags: Array<string> = [];

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    const gamesSubscription = this.gameService
      .getAllGames()
      .subscribe((res) => {
        this.games = res;
      });

    this.subs.push(gamesSubscription);
  }

  setCurrentPrice(value: number) {
    this.currentPrice = value;
  }

  setTags(value: string[]) {
    this.tags = value;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
