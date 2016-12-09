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
        var jsonArray: Array<Object> = json;
        return jsonArray.filter(json => {
          
          for (var key in json) {
            if (json[key] != null)
              return true;
          }
          return false;
        });

      case "audio only":
        var jsonArray: Array<Object> = json;
        console.log(jsonArray);
        return jsonArray.filter(json1 => {
          return true;
        });

      case "values":
        var values: Array<Object> = [];
        for (var key in json) {
          if (json[key] != null) {
            values.push(json[key]);
          }
        }
        return values.join();

      case "gettag":
        // var gettag: Array<Object> =[];
        for (var i in json){
          if (['meeting','talks','speech'].indexOf(json[i])>-1){
            return json[i];
          }
        }
      case "getdate":
        var jsonArray: Array<Object> = json;
        for(var i in jsonArray){
            console.log(jsonArray[i]);
        }
        
        // if(){

        // }
        // for (var i in json){
        //   console.log(json[i]);
        //   json.sort(function(a,b) { 
        //     return new Date(a.json[i].date).getTime() - new Date(b.json[i]).getTime() 
        //   });
        // }
        
      default:
        break;
    }

  }

}
