import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game, User } from '../../interfaces';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  input: string = '';

  @Input() user: User;
  @Input() game: Game;
  @Output() close = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  confirm() {
    this.close.emit(true);
  }

  cancel() {
    this.close.emit(false);
  }

  isBtnDisabled(): boolean {
    if (this.user) {
      return this.user?.username !== this.input;
    } else if (this.game) {
      return this.game?.id !== this.input;
    }
    return false;
  }
}
