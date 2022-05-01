import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../interfaces';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
})
export class GamesListComponent implements OnInit {
  @Input() games: Game[] = [];
  @Input() isOwned: boolean = false;
  @Input() main: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
