import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: any, args?: string): string {

    switch (args) {
      case "yyyy/MM/dd":
        var date: Date = new Date(value);
        return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
    }
  }
}