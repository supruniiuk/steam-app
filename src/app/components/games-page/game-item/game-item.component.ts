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

  @Input() isOwned: boolean = false;
  @Input() game: Game;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userInfo: string | null = localStorage.getItem('userInfo');
    this.user = JSON.parse(userInfo ? userInfo : '');

    if (!this.user.gamesList) {
      this.user.gamesList = [];
    }
    
    this.isSubmitted = !!this.user.gamesList.filter(
      (g) => g.id == this.game.id
    )[0];
  }

  addGame() {
    if (!this.isSubmitted) {
      this.isSubmitted = false;

      const newGame: Game = {
        id: this.game.id,
      };

      this.user.gamesList.push(newGame);
      const updatedUser = {
        ...this.user,
        id: null,
      };

      this.userService
        .updateUser(updatedUser, this.user.id)
        .subscribe((res) => {
          this.isSubmitted = true;

          const updUser = {
            ...res,
            id: this.user.id,
          };
          localStorage.setItem('userInfo', JSON.stringify(updUser));
        });
    }
  }
}
