import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() isOwned = false;
  constructor() { }

  ngOnInit(): void {
  }

}
