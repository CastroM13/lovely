import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'query',
  standalone: true
})
export class QueryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
