import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(array: Game[], field: string, str = ''): Game[] {
    if (!str?.trim()) {
      return array;
    }

    return array.filter((item) => {
      return item[field].toString().toLowerCase().includes(str.toLowerCase());
    });
  }
}
