import { Component, OnInit } from '@angular/core';
import { Game, User } from 'src/app/shared/interfaces';
import { GameService } from 'src/app/shared/services/games.service';
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(
    private gameService: GameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUserInfo();

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
      (err) => {
        this.errorMessage = err.message;
        setTimeout(() => {
          this.errorMessage = '';
        });
      }
    );
  }

  filterGames() {
    if (this.user.gamesList && this.user.gamesList.length > 0) {
      const userGames = this.user.gamesList;

      this.gamesList = this.allGames.filter((g) => userGames.includes(g.id));
    }
  }
}
