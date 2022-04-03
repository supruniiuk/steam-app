import { Component, Input, OnInit } from '@angular/core';
import { Game, User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  user: User;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  @Input() isOwned: boolean = false;
  @Input() game: Game;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUserInfo();

    if (!this.user.gamesList) {
      this.user.gamesList = [];
    }

    this.isSubmitted = !!this.user.gamesList.filter(
      (gameID) => gameID == this.game.id
    )[0];
  }

  addGame() {
    if (!this.isSubmitted) {
      this.isSubmitted = false;

      const newGame = this.game.id;

      this.user.gamesList.push(newGame);
      const updatedUser = {
        ...this.user,
        id: null,
      };

      this.userService.updateUser(updatedUser, this.user.id).subscribe(
        (res) => {
          this.isSubmitted = true;

          const updUser = {
            ...res,
            id: this.user.id,
          };

          this.userService.setCurrentUserInfo(updUser);
        },
        (err) => {
          this.errorMessage = err.message;
        }
      );
    }
  }
}
