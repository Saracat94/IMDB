import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/list.interfaces';

@Pipe({
  name: 'sortByRating',
})
export class SortByRatingPipe implements PipeTransform {
  transform(list: Item[], orderTo: string): Item[] {
    switch (orderTo) {
      case 'desc':
        return list.sort((a, b) => {
          return (b.rating || 0) - (a.rating || 0);
        });
      case 'asc':
        return list.sort((a, b) => {
          return (a.rating || 0) - (b.rating || 0);
        });
      default:
        return list;
    }
  }
}
