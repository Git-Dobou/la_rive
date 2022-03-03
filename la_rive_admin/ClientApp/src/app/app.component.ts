import { Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public loadingService: LoadingService) {
    this.loadingService.loading.next(false);
    console.log(this.loadingService.loading.value);
  }

  title = 'La Rive';
}
