import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../newInterfaces';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
})
export class GamesListComponent implements OnInit {
  @Input() games: Game[] = [];
  @Input() isDev: boolean = true;
  @Input() isOwned: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
