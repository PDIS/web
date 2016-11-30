import * as YAML from 'yamljs';
import { Injectable } from '@angular/core';

@Injectable()
export class ConvertService {

  constructor() { }

  convertYAMLtoJSON(yaml: string){
    return YAML.parse(yaml);
  }

}
