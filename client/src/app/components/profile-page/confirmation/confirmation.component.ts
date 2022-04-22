import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/newInterfaces';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
  username: string = '';

  @Input() user: User;
  @Output() close = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  confirm() {
    this.close.emit(true)
  }

  cancel() {
    this.close.emit(false)
  }

  isBtnDisabled(): boolean {
    return this.user.username !== this.username;
  }
}
