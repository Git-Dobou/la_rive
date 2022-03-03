import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModuleService {

  currentModule: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
  }
}
