import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { LogingService } from '../services/loging/loging.service';
import { ModuleService } from '../services/module/module.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isExpanded = false;
  currentModule: BehaviorSubject<string> = new BehaviorSubject('');

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    $event.returnValue = 'Your data will be lost!';
  }

  constructor(public moduleService: ModuleService,
    public loadingService: LoadingService,
    public logingService: LogingService) {
   
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
