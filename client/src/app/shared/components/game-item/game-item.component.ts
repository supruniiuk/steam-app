import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, User } from 'src/app/shared/newInterfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GameService } from 'src/app/shared/services/games.service';
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
    this.gameItem.nativeElement.style.display = 'none';
  }

  deleteGame() {
    const deleteSubscription = this.gameService
      .deleteGame(this.game.id)
      .subscribe(() => {
        this.hideGame();
      });

    this.subs.push(deleteSubscription);
  }

  updateGame(updatedGame: Game): void {
    this.game = updatedGame;
  }

  approve() {
    this.isSubmitted = true;

    this.gameService.approveGame(this.game.id).subscribe(() => {
      this.isSubmitted = false;
      this.hideGame();
    });
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

      this.gameOwningService.addGame(newGame).subscribe(() => {
        this.isSubmitted = true;
        this.isOwned = true;
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
