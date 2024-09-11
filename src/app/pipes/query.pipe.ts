import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'query',
  pure: false
})
export class QueryPipe implements PipeTransform {

  transform<T>(
    value: T[],
    query?: Partial<{ [key in keyof T]: T[keyof T] }>,
    sort?: (v1: T, v2: T) => number
  ) {
    if (query) value = value.filter(v => Object.entries(Object.entries(query).reduce((a,[k,v]) => (v ? ((a as {[key:string]: {}})[k]=v, a) : a), {})).every(([key, value]) => String((v as {[key:string]: string})[key]).toLowerCase().includes(String(value).toLowerCase())))['sort'](sort)
    if (sort) return value.sort(sort);
    return value;
  }

}
