import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameOwning } from 'src/app/shared/interfaces';
import { GameOwningService } from 'src/app/core/services/gameOwning.service';
@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnInit {
  ownGames: GameOwning[];
  subs: Subscription[] = [];

  constructor(private gameOwningService: GameOwningService) {}

  ngOnInit(): void {
    const getGames = this.gameOwningService.getAllGame().subscribe((res) => {
      this.ownGames = res;
      this.filterGames();
    });

    this.subs.push(getGames);
  }

  filterGames() {
    this.ownGames.sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
