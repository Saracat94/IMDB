import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInt'
})
export class ToIntPipe implements PipeTransform {


  transform(value: number | undefined, fixValue: number): string {
    if(value)
      return (value * 10).toFixed(fixValue);
    else
      return ""
  }

}
