import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../interfaces';

@Pipe({
  name: 'gameFilter',
})
export class GameFilterPipe implements PipeTransform {
  transform(games: Game[], price?: number, tags?: string[]): Game[] {
    games = games.filter((g) => {
      let consist = true;
      tags.map((t) => {
        if (!g.tag.includes(t)) {
          consist = false;
        }
      });
      return consist;
    });

    return games.filter((g) => {
      return g.price <= price;
    });
  }
}
