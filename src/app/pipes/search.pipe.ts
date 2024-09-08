import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform<T extends { [key: string]: any }>(data: T[], label: string, value: string | null): T[] {
    if (value === null) return data;
    return data.filter(d => d[label].toLowerCase()?.includes(value.toLowerCase()));
  }

}
