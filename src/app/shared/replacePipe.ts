import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePipe'
})
export class replacePipe implements PipeTransform {

  transform(target: string): string {
    //  console.log(target.replace(/&amp;/g,'&'))
    return target.replace(/&amp;/g,'&')
  }

}
