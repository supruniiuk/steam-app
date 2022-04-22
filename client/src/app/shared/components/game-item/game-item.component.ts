import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GameService } from 'src/app/shared/services/games.service';
import { Game, User } from '../../interfaces';
import { GameOwningService } from '../../services/gameOwning.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  user: User;
  isSubmitted: boolean = false;
  subs: Subscription[] = [];
  updateId: string;
  role: string;

  deleteGame: boolean = false;
  deleteGameOwning: boolean = false;

  @Input() isOwned: boolean = false;
  @Input() game: Game;
  @Input() main: boolean = false;
  @ViewChild('gameItem') gameItem;

  constructor(
    private gameService: GameService,
    public authService: AuthService,
    private gameOwningService: GameOwningService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

  hideGame(): void {
    this.gameItem.nativeElement.style.pointerEvents = 'none';
    this.gameItem.nativeElement.style.opacity = 0.5;
  }

  updateGame(updatedGame: Game): void {
    this.game = updatedGame;
  }

  approve() {
    this.isSubmitted = true;

    const approveSub = this.gameService
      .approveGame(this.game.id)
      .subscribe(() => {
        this.isSubmitted = false;
        this.hideGame();
      });

    this.subs.push(approveSub);
  }

  isDev(): boolean {
    return this.role === 'developer';
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isGamer(): boolean {
    return this.role === 'gamer';
  }

  addGame() {
    if (!this.isSubmitted) {
      this.isSubmitted = false;

      const newGame = this.game.id;

      const addSub = this.gameOwningService.addGame(newGame).subscribe(() => {
        this.isSubmitted = true;
        this.isOwned = true;
      });

      this.subs.push(addSub);
    }
  }

  delete(confirm: boolean): void {
    if (confirm) {
      if (this.deleteGame) {
        const deleteSubscription = this.gameService
          .deleteGame(this.game.id)
          .subscribe(() => {
            this.hideGame();
          });

        this.subs.push(deleteSubscription);
      }
      if (this.deleteGameOwning) {
        const deleteOwningSubscription = this.gameOwningService
          .deleteGame(this.game.id)
          .subscribe(() => {
            this.hideGame();
          });

        this.subs.push(deleteOwningSubscription);
      }
    } else {
      this.deleteGame = false;
      this.deleteGameOwning = false;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
