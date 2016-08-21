import { Component } from '@angular/core';

import { StackService } from '../shared/stack/stack.service';
import { Stack } from '../shared/stack/stack.class';

@Component({
  selector: 'hdo-stack-list',
  providers: [
    StackService
  ],
  directives: [
  ],
  pipes: [ ],
  styles: [],
  template: require('./stack-list.html')
})
export class StackListComponent {
  public stacks: Stack[];
  
  constructor(private service: StackService) {
  }

  ngOnInit() {
    this.service.getStacks().subscribe(stacks => this.stacks = stacks);
  }
}
