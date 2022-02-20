import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/interfaces';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {
  currentPrice: number;
  games: Game[];
  priceRange: { min: number; max: number };
  errorMessage: string = '';
  tags: string[] = [];
  srcStr: string = '';
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(
      (res) => {
        this.games = Object.keys(res).map((key: any) => {
          res[key].id = key;
          return res[key];
        });

       //this.filterGames();
        this.setPricesRange();
      },
      (err) => (this.errorMessage = err.message)
    );
  }

  filterGames() {
    const userInfo: string | null = localStorage.getItem('userInfo');
    const user = JSON.parse(userInfo ? userInfo : '');
    if (user.gamesList && user.gamesList.length > 0) {
      const userGames = user.gamesList.map((g) => g.id);

      this.games = this.games.filter((g) => !userGames.includes(g.id));
    }
  }

  setPricesRange() {
    const prices: number[] = this.games.map((g) => g.price);
    this.priceRange = { min: Math.min(...prices), max: Math.max(...prices) };
    this.currentPrice = this.priceRange.max;
  }

  setCurrentPrice(event: any): void {
    this.currentPrice = +event.target.value;
  }

  pickTag(): void {
    this.tags = [];
    const checked = document.querySelectorAll('input[name=tag]:checked');
    for (let i = 0; i < checked.length; i++) {
      this.tags.push(checked[i].getAttribute('value'));
    }
  }
}
