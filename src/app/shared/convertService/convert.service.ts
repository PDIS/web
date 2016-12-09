///<reference path="../../../../typings/yamljs/yamljs.d.ts" />
import * as YAML from 'yamljs';
import { Injectable } from '@angular/core';

@Injectable()
export class ConvertService {

  constructor() { }

  convertYAMLtoJSON(yaml: string){
    // yaml = yaml.replace(/ *: */g,": ");
    return YAML.parse(yaml);
  }

}
