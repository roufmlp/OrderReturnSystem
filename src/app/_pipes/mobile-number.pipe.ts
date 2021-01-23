
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileNumber'
})
export class MobileNumberPipe implements PipeTransform {

  constructor() { }
  transform(value: string): string {
    // console.log('pipe value', value);
    value = value.toString();
    if(value.startsWith('9715')){
      return value.substring(4, value.length);
    } else {
      return value
    }
  }
}