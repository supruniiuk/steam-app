import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(array: any, field: string, str = ''): any {
    if (!str?.trim()) {
      return array;
    }

    return array.filter((item) => {
      return item[field].toString().toLowerCase().includes(str.toLowerCase());
    });
  }
}
