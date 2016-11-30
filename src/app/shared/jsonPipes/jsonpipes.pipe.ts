import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'JSONpipes'
})
export class JSONPipesPipe implements PipeTransform {

  transform(json: any, type: string): any {

    switch (type) {
      case "keys":
        return Object.keys(json).join();

      case "not null object of array":
        var jsonArray:Array<Object> = json;
        return jsonArray.filter(json=>{
          for(var key in json) {
              if(json[key]!=null)
                return true;
          }
          return false;
        });
      
      case "values":
        var values:Array<Object> = [];
        for(var key in json) {
          if(json[key]!=null)
          {
            values.push(json[key]);
          }
        }
        return values.join();
    
      default:
        break;
    }

  }

}
