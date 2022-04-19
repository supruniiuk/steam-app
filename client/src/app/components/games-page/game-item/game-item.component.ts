import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, User } from 'src/app/shared/newInterfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  user: User;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  subs: Subscription[] = [];
  updateId: string;

  @Input() isOwned: boolean = false;
  @Input() game: Game;
  @Input() isDev: boolean = false;
  @ViewChild('gameItem') gameItem;

  constructor(
    private gameService: GameService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  deleteGame() {
    const deleteSubscription = this.gameService
      .deleteGame(this.game.id)
      .subscribe(() => {
        this.gameItem.nativeElement.style.display = 'none';
      });

    this.subs.push(deleteSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  updateGame(updatedGame: Game): void {
    this.game = updatedGame;
  }

  addGame() {
    /*if (!this.isSubmitted) {
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

          //this.userService.setCurrentUserInfo(updUser);
        },
        (err) => {
          this.errorMessage = err.message;
        }
      );
    }*/
  }
}
