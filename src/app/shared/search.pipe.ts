import { Pipe, PipeTransform } from '@angular/core';
import { User } from './interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], search = ''): User[] {
    if (!search.trim()) {
      return users
    }

    return users.filter(u => {
      return u.email.includes(search.toLowerCase())
    })
  }
}