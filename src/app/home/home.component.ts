import { Component } from '@angular/core';

import { LocalStorageService } from '../shared';
import { MainNavigationComponent } from '../main-navigation';
import { StackListComponent } from '../stack-list';

@Component({
  selector: 'hdo-home',
  providers: [
    MainNavigationComponent,
    StackListComponent
  ],
  template: require('./home.html')
})
export class HomeComponent {
  constructor(private storageService: LocalStorageService, private window: Window) {}

  clearStorage() {
    this.storageService.clearStorage('chat');
    this.storageService.clearStorage('stacks');
    window.location.reload();
  }
}
