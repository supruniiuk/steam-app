import { Component, OnInit } from '@angular/core';
import { Game, User } from 'src/app/shared/interfaces';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnInit {
  user: User;
  gamesList: Array<Game>;
  allGames: Array<Game>;
  errorMessage: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    const userInfo: string | null = localStorage.getItem('userInfo');
    this.user = JSON.parse(userInfo ? userInfo : '');

    if (!this.user.gamesList) {
      this.user.gamesList = [];
    }

    this.gameService.getAllGames().subscribe(
      (res) => {
        this.allGames = Object.keys(res).map((key: any) => {
          res[key].id = key;
          return res[key];
        });

        this.filterGames();
      },
      (err) => (this.errorMessage = err.message)
    );
  }

  filterGames() {;
    if (this.user.gamesList && this.user.gamesList.length > 0) {
      const userGames = this.user.gamesList.map((g) => g.id);

      this.gamesList = this.allGames.filter((g) => userGames.includes(g.id));
    }
  }
}
